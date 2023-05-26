'use client'

import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityInterface } from "@/types/activity";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import Loading from "./loading";
import { ActivityStateInterface } from "@/types/activityState";
import Image from "next/image";

interface PageParams {
  params: {
    id: string;
  };
}

const Activity = ({ params }: PageParams) => {
  const [activityState, setActivityState] = useState<ActivityStateInterface | null>(null);
  
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/activitystate/${params.id}`)
      setActivityState(res.data.data)
    }
    getData();
  }, [])

  return (
    <>
      {
        activityState ? <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-80 w-80 mx-auto overflow-hidden">
              <Image
                alt="Activity Image"
                className="object-center h-full w-full"
                height={100}
                width={100}
                src={activityState.activityId.image}
                blurDataURL={activityState.activityId.image}
                placeholder='blur'
                priority
                quality={100}
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                  {activityState.activityId.instructor.image ? (
                    <img
                      alt="Instructor"
                      className="object-center h-full w-full"
                      src={activityState.activityId.instructor.image}
                    />
                  ) : (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-lg">
                    {activityState.activityId.instructor.fullName}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base text-gray-400">
                    {activityState.activityId.instructor.details}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="my-2 font-extrabold text-2xl md:text-4xl text-white">
                  {activityState.activityId.name}
                </h1>
                <div className="w-24 h-1 bg-indigo-500 rounded mt-2 mb-4 mx-auto sm:mx-0"></div>
                <h3 className={`tracking-widest ${activityState.bookedSeat < activityState.totalSeat ? 'text-green-400' : 'text-red-500'} text-sm font-medium title-font`}>
                  Seat Status: {activityState.bookedSeat}/{activityState.totalSeat}
                </h3>
                <h3 className={`tracking-widest text-indigo-400 text-sm font-medium title-font`}>
                  Registration Fee: {activityState.activityId.price}
                </h3>
                <p className="leading-relaxed text-lg mb-4">
                  {
                    activityState.activityId.description && activityState.activityId.description.split('\n').map((nl: string, index: number) => (
                      <div key={index}>{nl}</div>
                    ))
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> : <Loading />
      }
    </>
  );
};

export default Activity;
