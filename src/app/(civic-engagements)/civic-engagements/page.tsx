"use client";

import Loading from "@/app/(activities)/activities/loading";
import AIActivitySuggestionModal from "@/components/AIActivitySuggestionModal";
import EnrollmentFeeDetails from "@/components/EnrollmentFeeDetails";
import ActivityCard from "@/components/ui/ActivityCard";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityStateInterface } from "@/types/activityState";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const CivicEngagements = () => {
  const [activityStates, setActivityStates] = useState<
    ActivityStateInterface[] | null
  >(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${apiEndpointV1}/activitystate?registrationDay=0`
      );
      setActivityStates(
        res.data.data.filter(
          (x: ActivityStateInterface) => x.activityId.type === "Civic"
        )
      );
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
                  Civic Engagements
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <EnrollmentFeeDetails day={0} />
            <div className="flex flex-wrap -m-4">
              {activityStates.length > 0 &&
                activityStates.map(
                  (activityState: ActivityStateInterface, index: number) => {
                    return (
                      <div key={index} className="xl:w-1/4 md:w-1/2 w-full p-4">
                        <ActivityCard activityState={activityState} />
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

export default CivicEngagements;
