"use client";

import AIActivitySuggestionModal from "@/components/AIActivitySuggestionModal";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityStateInterface } from "@/types/activityState";
import Loading from "./loading";
import { Input } from "@/components/ui/Input";
import ActivityCard from "@/components/ui/ActivityCard";
import EnrollmentFeeDetails from "@/components/EnrollmentFeeDetails";

const Activities = () => {
  const [activityStates, setActivityStates] = useState<
    ActivityStateInterface[] | null
  >(null);
  const [filteredActivityStates, setFilteredActivityStates] = useState<
    ActivityStateInterface[] | null
  >(null);

  const [showActivities, setShowActivities] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const regInfo = await axios.get(
        `${apiEndpointV1}/admin?session=Summer2023`
      );
      const res = await axios.get(`${apiEndpointV1}/activitystate`);
      setActivityStates(
        res.data.data.filter(
          (d: ActivityStateInterface) => d.registrationDay === 1
        )
      );
      setFilteredActivityStates(
        res.data.data.filter(
          (d: ActivityStateInterface) => d.registrationDay === 1
        )
      );
    };
    getData();
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase().replace(/\s/g, "");

    const updated: ActivityStateInterface[] | undefined =
      activityStates?.filter((activity: ActivityStateInterface) =>
        activity.activityId.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchText)
      );

    updated && setFilteredActivityStates(updated);
  };

  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      {/* <AIActivitySuggestionModal /> */}

      {filteredActivityStates ? (
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-8">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  RS Activities
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <EnrollmentFeeDetails day={2} />
            <h1 className="text-center font-bold text-3xl text-indigo-500 my-3">
              Enrollment starts from 9:00 AM to 11:00 PM.
            </h1>
            <div className="my-2 mb-6 flex items-end">
              <Input
                className="mx-auto"
                placeholder="Search"
                onChange={(e) => handleSearchInput(e)}
              />
            </div>
            {showActivities ? (
              <div className="flex flex-wrap -m-4">
                {filteredActivityStates.length > 0 &&
                  filteredActivityStates.map(
                    (activityState: ActivityStateInterface, index: number) => {
                      return (
                        <div
                          key={index}
                          className="xl:w-1/4 md:w-1/2 w-full p-4"
                        >
                          <ActivityCard activityState={activityState} />
                        </div>
                      );
                    }
                  )}
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-white">
                Registration for RS activities is
                <span className="text-indigo-500 uppercase"> Closed </span>
              </h1>
            )}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Activities;
