import { StudentInterface } from '@/types/student'
import React from 'react'

const StudentInfoDisplayer = ({ studentInfo }: { studentInfo: StudentInterface }) => {
  return (
    <div className="my-2 bg-indigo-500 bg-opacity-10 text-white text-sm font-semibold rounded-sm border-2 border-indigo-500 p-3">
        <p>{studentInfo.name}</p>
        <p>ID: {studentInfo.studentId}</p>
        <p>{studentInfo.phoneNumber}</p>
    </div>
  )
}

export default StudentInfoDisplayer
