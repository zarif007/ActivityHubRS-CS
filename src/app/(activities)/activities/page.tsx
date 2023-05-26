"use client";
import AIActivitySuggestionModal from "@/components/AIActivitySuggestionModal";
import { colorSchema } from "@/lib/ColorSchema";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityInterface } from "@/types/activity";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ActivityStateInterface } from "@/types/activityState";
import Loading from "./loading";
import Image from "next/image";

const Activities = () => {
  const styles = {
    button: `${colorSchema.button} mt-2 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };

  const [activityStates, setActivityStates] = useState<
    ActivityStateInterface[] | null
  >(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/activitystate`);
      setActivityStates(res.data.data);
    };
    getData();
  }, []);

  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      <AIActivitySuggestionModal />

      {activityStates ? (
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-16">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  RS Activities
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <div className="w-fit p-2 border-2 border-indigo-500 mb-4 rounded">
              <h3 className="text-bold font-semibold text-white">Fee Deposit Information</h3>
              <p><span className="text-white">Day: </span>June 8/9/10</p>
              <p><span className="text-white">Venue: </span>Rs Accounts Office,Surjodoy Buiding</p>
            </div>
            <div className="flex flex-wrap -m-4">
              {activityStates.length > 0 &&
                activityStates.map(
                  (activityState: ActivityStateInterface, index: number) => {
                    return (
                      <div key={index} className="xl:w-1/4 md:w-1/2 w-full p-4">
                        <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                          <Image
                            className="h-40 rounded w-full object-cover object-center mb-6"
                            src={activityState.activityId.image}
                            alt="Activity Image"
                            width={40}
                            height={100}
                            style={{ objectFit: "contain" }}
                            blurDataURL={activityState.activityId.image}
                            placeholder='blur'
                            priority
                            quality={100}
                          />
                          {/* <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">
                            {activityState.activityId.day}(
                            {activityState.activityId.classTime})
                          </h3> */}
                          <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">
                            Registration Fee: {activityState.activityId.price}
                          </h3>
                          <Link
                            href={`/activities/${activityState.activityId._id}`}
                          >
                            <div className="text-lg text-white font-medium title-font mb-6 h-8">
                              {activityState.activityId.name}
                            </div>
                          </Link>
                          <h3 className={`tracking-widest ${activityState.bookedSeat < activityState.totalSeat ? 'text-green-400' : 'text-red-500'} text-xs font-medium title-font uppercase`}>
                            Seat Status: {activityState.bookedSeat}/{activityState.totalSeat}
                          </h3>
                          <Link
                            href={`/activities/${activityState.activityId._id}`}
                            className={styles.button}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Activities;
