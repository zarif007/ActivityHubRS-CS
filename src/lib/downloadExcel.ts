import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { apiEndpointV1 } from './ApiEndpoints';
import axios from 'axios';
import { RegistrationInterface } from '@/types/registration';

const formatName = (name: string) => {
  if(name.length < 31) return name;
  if(name.includes('Section')) {
    return name.replace('Section ', '')
  } 

  return name.slice(0, 31);
}

const downloadExcel = async () => {

  const res = await axios.get(`${apiEndpointV1}/registration`)
  const reg: RegistrationInterface[] = res.data.data;

  const motherObj: any = {};
  reg.map((d: RegistrationInterface) => {
    if(motherObj[`${d.activityId.name}`]?.length > 0) {
      motherObj[`${d.activityId.name}`] = [
        ...motherObj[`${d.activityId.name}`],
        { SL: motherObj[`${d.activityId.name}`].length + 1,Name: d.studentId.name, Email: d.studentId.email }
      ]
    } else {
      motherObj[`${d.activityId.name}`] = [
        { SL: 1, Name: d.studentId.name, Email: d.studentId.email }
      ]
    }
  })

  // Create a new workbook and add a worksheet
  const workbook = XLSX.utils.book_new();


  Object.entries(motherObj).map((obj: any) => {
    const worksheet = XLSX.utils.json_to_sheet(obj[1]);
    worksheet['!cols'] = [{ width: 10 }, { width: 30 }, { width: 50 } ];

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, formatName(obj[0]));
    
  })
  
  // Generate the Excel file buffer
  const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

  // Convert the buffer to a Blob
  const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save the Blob as a file using FileSaver.js
  saveAs(excelBlob, 'data.xlsx');
};

export default downloadExcel;
