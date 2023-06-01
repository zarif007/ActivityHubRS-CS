"use client"

import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityStateInterface } from "@/types/activityState";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const ActivityEnrollmentSchedule = () => {
  const [activities, setActivities] = useState<ActivityStateInterface[]>([]);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/activitystate`);
      setActivities(
        res.data.data.filter(
          (ds: ActivityStateInterface) => ds.registrationDay !== 0
        )
      );
    };
    getData();
  }, []);
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900 px-2">
      <div className="flex flex-wrap w-full mb-16">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-white">
            Activity Enrollment Schedule
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <ShowDayWise activities={activities} day={1} />
      <ShowDayWise activities={activities} day={2} />
    </div>
  );
};

const ShowDayWise = ({activities, day}: { activities: ActivityStateInterface[], day: number }) => {
  return (
    <div className="text-white">
      <h1 className="font-bold">Day {day}</h1>
        {
          activities.map((activity: ActivityStateInterface, index) => (
            <div key={index}>
              {
                activity.registrationDay === day && <p>{activity.activityId.name}</p>
              }
            </div>
          ))
        }
    </div>
  )
}

export default ActivityEnrollmentSchedule;
