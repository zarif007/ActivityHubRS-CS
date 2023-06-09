import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { apiEndpointV1 } from './ApiEndpoints';
import { RegistrationInterface } from '@/types/registration';

const headers = ['SL', 'Name', 'Student ID', 'Email', 'Phone Number', 'Bangla Section', 'Room Number']

const formatName = (name: string) => {
  if(name.length < 31) return name;
  if(name.includes('Section'))
    return name.replace('Section ', '')

  return name.slice(0, 31);
}

const downloadExcel = async (preference: string) => {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();

  const res = await axios.get(`${apiEndpointV1}/registration`)
  const reg: RegistrationInterface[] = res.data.data;

  const motherObj: any = {};
  reg.map((d: RegistrationInterface) => {
    if(preference === 'All' || d.activityId.name === preference) {
      if(motherObj[`${d.activityId.name}`]?.length > 0) {
        motherObj[`${d.activityId.name}`] = [
          ...motherObj[`${d.activityId.name}`],
          { SL: motherObj[`${d.activityId.name}`].length + 1, Name: d.studentId.name, Id: d.studentId.studentId ,Email: d.studentId.email, PhoneNumber: d.studentId.phoneNumber, BanglaSection: d.studentId.bngSection, RoomNumber: d.studentId.roomNumber }
        ]
      } else {
        motherObj[`${d.activityId.name}`] = [
          { SL: 1, Name: d.studentId.name, Id: d.studentId.studentId ,Email: d.studentId.email, PhoneNumber: d.studentId.phoneNumber, BanglaSection: d.studentId.bngSection, RoomNumber: d.studentId.roomNumber  }
        ]
      }
    }    
  })

  Object.entries(motherObj).forEach((obj: any) => {
    // Add a worksheet
    const worksheet = workbook.addWorksheet(formatName(obj[0]));
    // Add headers
    const nameRow = worksheet.addRow(['', '', '', `${obj[0]}`]);
    const headerRow = worksheet.addRow(headers);

    headerRow.font = { bold: true };
    nameRow.font = { bold: true, size: 14 };

    // Add data rows
    obj[1].forEach((data: any) => {
      const rowValues = Object.values(data);
      worksheet.addRow(rowValues);
    });

    // Set column widths
    const columnWidths = [5, 30, 20, 40, 20, 20, 15];

    columnWidths.forEach((width, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = width;
    });
  })

  // Generate the Excel file buffer
  return workbook.xlsx.writeBuffer().then((buffer) => {
    // Convert the buffer to a Blob
    const excelBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the Blob as a file using FileSaver.js
    saveAs(excelBlob, preference === 'All' ? 'All Activities Registration.xlsx' : `${preference} Registration.xlsx`);
  });
};

export default downloadExcel;
