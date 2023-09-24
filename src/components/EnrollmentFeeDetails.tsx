import React from "react";

const EnrollmentFeeDetails = ({ day }: { day: number }) => {
  const venue = "OB-Basement canteen";
  const paymentDays = [
    "September 27, 2023 from 3pm to 5pm",
    "June 8, 2023 from 2 - 5pm",
  ];
  const activityDayNames = ["Civic Engagement", "Activity Day 1"];
  return (
    <div className="w-fit p-2 border-2 border-indigo-500 mb-4 rounded">
      <h3 className="text-bold font-semibold text-white">
        Fee Deposit Information
      </h3>
      <div>
        {day === 10 ? (
          <div className="flex flex-col">
            {paymentDays.map((d: string, index: number) => (
              <p key={index} className="text-indigo-500">
                {index !== 0 && (
                  <>
                    <span className="text-white">
                      Date ({activityDayNames[index]}):{" "}
                    </span>{" "}
                    {d}
                  </>
                )}
              </p>
            ))}
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
