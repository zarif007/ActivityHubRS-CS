"use client";

import React, { useEffect, useState } from "react";
import { RegistrationInterface } from "./../../../../types/registration/index";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import EnrollmentFeeDetails from "@/components/EnrollmentFeeDetails";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface PageParams {
  params: {
    id: string;
  };
}

const Registration = ({ params }: PageParams) => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 max-w-5xl w-full mx-auto`,
  };
  const [registration, setRegistration] =
    useState<RegistrationInterface | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${apiEndpointV1}/registration?_id=${params.id}`
      );
      setRegistration(res.data.data[0]);
    };
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      {
        registration ? <div className="mx-2">
          <h1 className="text-5xl font-bold text-green-400 mb-4">
            Registration Successful 🎉
          </h1>
          <h1 className="text-2xl font-bold text-white">
            Registration ID: <span className="text-indigo-500">{params.id}</span>
          </h1>
          <div className="text-white rounded font-semibold my-4">
            <span className="text-indigo-500 font-semibold">Note: </span> Now full fill
            payment to confirm your enrollment
            <EnrollmentFeeDetails />
          </div>
          <h1 className="text-2xl font-bold text-indigo-500">
            Student Information
          </h1>
          <div className="flex md:flex-row flex-col">
            <ShowInfo title='Name' text={registration.studentId.name} />
            <ShowInfo title='Student ID' text={registration.studentId.studentId} />
          </div>
          <div className="flex md:flex-row flex-col">
            <ShowInfo title='email' text={registration.studentId.email} />
            <ShowInfo title='phone Number' text={registration.studentId.phoneNumber} />
          </div>
          <h1 className="text-2xl font-bold text-indigo-500 mt-8">
            Activity Information
          </h1>
          <div className="flex md:flex-row flex-col">
            <ShowInfo title='Name' text={registration.activityId.name} />
            <ShowInfo title='Fee' text={`${registration.activityId.price} BDT`} />
          </div>
          <div className="flex md:flex-row flex-col">
            <ShowInfo title='Time' text={`${registration.activityId.day}-(${registration.activityId.classTime})`} />
            <ShowInfo title='Venue' text={registration.activityId.venue} />
          </div>
        </div> : <LoadingSpinner />
      }
    </div>
  );
};

const ShowInfo = ({ title, text }: { title: string, text: string }) => {
  return (
    <div className="p-2 text-white font-semibold bg-gray-800 rounded m-1 ml-0 w-full truncate"><span className="text-indigo-500 uppercase">{title}:</span> {text}</div>
  )
}

export default Registration;