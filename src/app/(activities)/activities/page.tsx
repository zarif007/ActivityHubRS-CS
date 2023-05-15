import AIActivitySuggestionModal from "@/components/AIActivitySuggestionModal";
import { domain } from "@/lib/Domain";
import axios from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Fake API || Dashboard",
  description: "App for generating APIs with Fake data"
}

const Activities = async () => {

  const activities = await axios.get(`${domain}/activity`)

  if(!activities) return notFound()

  console.log('data', activities.data.data)
  
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      
      <AIActivitySuggestionModal />
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                RS Activities
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {
              activities.data.data.length > 0 && activities.data.data.map((activity: any, index: number) => {
                return (
                  <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                    <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                      <img
                        className="h-40 rounded w-full object-cover object-center mb-6"
                        src={activity.image}
                        alt="Activity Image"
                        style={{ objectFit: 'contain' }}
                      />
                      <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">
                        SUBTITLE
                      </h3>
                      <h2 className="text-lg text-white font-medium title-font mb-4">
                        San Francisco
                      </h2>
                      <p className="leading-relaxed text-base">
                        Fingerstache flexitarian street art 8-bit waistcoat.
                        Distillery hexagon disrupt edison bulbche.
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
