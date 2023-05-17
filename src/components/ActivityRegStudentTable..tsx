import { RegistrationInterface } from "@/types/registration";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export function ActivityRegStudentTable({
  registrationInfo,
}: {
  registrationInfo: RegistrationInterface[];
}) {
  return (
    <SimpleBar forceVisible="y" autoHide={false}>
      <Table className="text-white border-2 border-gray-800 p-8 rounded w-full">
        <TableCaption>Registered Students</TableCaption>
        <TableHeader className="border-2 border-gray-800">
          <TableRow className="">
            <TableHead>Activity Name</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Bangla Section</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrationInfo.map((registrationInfo: RegistrationInterface) => (
            <TableRow key={registrationInfo._id}>
              <TableCell>{registrationInfo.activityId.name}</TableCell>
              <TableCell className="font-medium">
                {registrationInfo.studentId.studentId}
              </TableCell>
              <TableCell>{registrationInfo.studentId.name}</TableCell>
              <TableCell>{registrationInfo.studentId.phoneNumber}</TableCell>
              <TableCell className="text-right">
                {registrationInfo.studentId.bngSection}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SimpleBar>
  );
}
