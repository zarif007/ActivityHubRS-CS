import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityInterface } from "@/types/activity";
import axios from "axios";
import React from "react";

interface PageParams {
  params: {
    id: string;
  };
}

const Activity = async ({ params }: PageParams) => {
  const res = await axios.get(`${apiEndpointV1}/activity/${params.id}`);
  const activity: ActivityInterface = res.data.data;

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-80 w-80 mx-auto overflow-hidden">
            <img
              alt="Activity Image"
              className="object-center h-full w-full"
              src={activity.image}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                {!activity.instructor.image ? (
                  <img
                    alt="content"
                    className="object-center h-full w-full"
                    src={activity.instructor.image}
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
                  {activity.instructor.fullName}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base text-gray-400">
                  {activity.instructor.details}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="my-2 font-extrabold text-2xl md:text-4xl text-white">{activity.name}</h1>
              <div className="w-24 h-1 bg-indigo-500 rounded mt-2 mb-4 mx-auto sm:mx-0"></div>
              <h3 className="tracking-widest text-indigo-400 text-sm font-medium title-font">
                {activity.day}({activity.classTime}) at {activity.venue}
              </h3>
              <p className="leading-relaxed text-lg mb-4">
                {activity.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activity;
