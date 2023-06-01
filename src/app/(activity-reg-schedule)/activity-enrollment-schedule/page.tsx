"use client"

import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityStateInterface } from "@/types/activityState";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from './../../../components/ui/LoadingSpinner';

const registrationDays = ['6th of June', '7th of June', '8th of June'];

const ActivityEnrollmentSchedule = () => {
  const [activities, setActivities] = useState<ActivityStateInterface[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/activitystate`);
      setActivities(res.data.data);
    };
    getData();
  }, []);
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900 px-2">
      <div className="flex flex-wrap w-full mb-8">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-white">
            Activity Signup Schedule
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      {
        activities ? <div>
          <ShowDayWise activities={activities} day={1} />
          <ShowDayWise activities={activities} day={2} />
          <ShowDayWise activities={activities} day={3} />
        </div> : <LoadingSpinner />
      }
    </div>
  );
};

const ShowDayWise = ({activities, day}: { activities: ActivityStateInterface[], day: number }) => {
  return (
    <div className="text-white my-4">
      <h1 className="font-bold text-2xl text-indigo-500">Day {day} ({registrationDays[day - 1]})</h1>
        <div className="ml-6">
        {
          activities.map((activity: ActivityStateInterface, index) => (
            <div key={index} className="w-fit">
              {
                activity.registrationDay === day && <Link href={`/activities/${activity.activityId._id}`} className="my-1 text-lg font-semibold cursor-pointer flex space-x-4 items-center">
                  <img src={activity.activityId.image} className="h-8 w-8 rounded" />
                  <p>{activity.activityId.name}</p>
                </Link>
                
              }
            </div>
            
          ))
        }
        </div>
    </div>
  )
}

export default ActivityEnrollmentSchedule;
