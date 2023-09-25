import Link from "next/link";
import React from "react";

const EnrollmentFeeDetails = ({ day }: { day: number }) => {
  const venue = "OB-Basement canteen";
  const paymentDays = [
    "September 27, 2023 from 3PM to 5PM",
    "September 28, 2023 from 10AM to 4PM",
    "https://docs.google.com/spreadsheets/d/1rY_KU5eyBwaMP-_BKYc2147MLH-NL0Vt/edit#gid=1891669613",
    "October 2, 2023 from 2PM to 5PM",
  ];
  const activityDayNames = [
    "Civic Engagement",
    "Duke Of Edinburgh",
    "Activity Day 1",
    "Amra Notun Network",
  ];
  return (
    <div className="w-fit p-2 border-2 border-indigo-500 mb-4 rounded">
      <h3 className="text-bold font-semibold text-white">
        Fee Deposit Information
      </h3>
      <div>
        {day === 10 ? (
          <div className="flex flex-col">
            <p className="text-indigo-500">
              <span className="text-white">
                Date ({activityDayNames[day]}):{" "}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-indigo-500">
            <span className="text-white">Date ({activityDayNames[day]}): </span>{" "}
            {day === 2 ? (
              <Link
                href={paymentDays[day]}
                target="_blank"
                className="decoration-2 underline"
              >
                Click to View
              </Link>
            ) : (
              <span>{paymentDays[day]} </span>
            )}
          </p>
        )}
      </div>
      <p className="text-indigo-500">
        <span className="text-white">Venue: </span> {venue}
      </p>
    </div>
  );
};

export default EnrollmentFeeDetails;
