import React from "react";

const EnrollmentFeeDetails = ({ day }: { day: number }) => {
  const venue = "OB-Basement canteen";
  const paymentDays = ["September 28, 2023 from 10am to 4pm","September 27, 2023 from 3pm to 5pm", "https://docs.google.com/spreadsheets/d/1rY_KU5eyBwaMP-_BKYc2147MLH-NL0Vt/edit#gid=1891669613"];
  const activityDayNames = ["Duke Of Edinburgh","Civic Engagement", "Activity Day 1"];
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
            {paymentDays[day]}{" "}
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
