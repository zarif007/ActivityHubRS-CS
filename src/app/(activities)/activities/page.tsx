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

  useEffect(() => {
    const getData = async () => {
      const regInfo = await axios.get(`${apiEndpointV1}/admin?session=Summer2023`)
      const res = await axios.get(`${apiEndpointV1}/activitystate`);
      setActivityStates(res.data.data.filter((d: ActivityStateInterface) => d.registrationDay >= regInfo.data.data[0].registrationDay));
      setFilteredActivityStates(res.data.data.filter((d: ActivityStateInterface) => d.registrationDay >= regInfo.data.data[0].registrationDay));
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
      <AIActivitySuggestionModal />

      {filteredActivityStates ? (
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
            <EnrollmentFeeDetails />
            <div className="my-2 mb-6 flex items-end">
              <Input
                className="mx-auto"
                placeholder="Search"
                onChange={(e) => handleSearchInput(e)}
              />
            </div>
            <div className="flex flex-wrap -m-4">
              {filteredActivityStates.length > 0 &&
                filteredActivityStates.map(
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

export default Activities;
