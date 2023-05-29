import React from "react";

const EnrollmentFeeDetails = () => {

    const info = [
        {
            day: 'May 31, 2023 from 9am to 5pm',
            venue: `RS
            Accounts office`
        },
        {
            day: 'June 8/9/10',
            venue: `Rs Accounts Office, Surjodoy
            Buiding`
        }
    ]
  return (
    <div className="w-fit p-2 border-2 border-indigo-500 mb-4 rounded">
      <h3 className="text-bold font-semibold text-white">
        Fee Deposit Information
      </h3>
      <p>
        <span className="text-white">Day: </span> {info[0].day}
      </p>
      <p>
        <span className="text-white">Venue: </span> {info[0].venue}
      </p>
    </div>
  );
};

export default EnrollmentFeeDetails;
