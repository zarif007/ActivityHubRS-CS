"use client";

import { SeminarInterface } from "@/types/seminar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import MultiPurposeCard from "@/components/ui/MultiPurpose.Card";
import LoadingSpinner from './../../../components/ui/LoadingSpinner';
import { WorkshopInterface } from "@/types/workshop";

const workshops: WorkshopInterface[] = [
  {
    image: "https://i.ibb.co/7rw8FPp/Paraphrasing.png",
    title: "Workshop on Paraphrasing",
    objective: `This workshop aims to help the participants have a better understanding of what 
      paraphrasing is and how to do it. The workshop includes paraphrasing exercises, and hence, 
      will be a hands-on learning experience.`,
    date: "Thursday, June 15, 2023",
    time: "10am to 12pm",
    venue: "Markuli Hall",
    seatLimit: 50,
    facilitators: [
      "•  The Resource Unit",
      "•  School of General Education (GenEd)"
    ],
    registeredStudents: [],
  },
  {
    image: "https://i.ibb.co/R4hGwQk/Increase-Attention-through-Yoga-and-Meditation-1.png",
    title: "Increase Self-Awareness and Concentration through Yoga and Meditation",
    objective: `The main objective of the workshop is to introduce the art of living a peaceful life. 
      Moreover, the participants will get a unique opportunity to improve their self-awareness, 
      concentration and confidence which will help them to improve their academic performance. `,
    date: "15th June 2023 (Thursday)",
    time: "4:30 pm- 6:00 pm",
    venue: "Markuli Hall",
    seatLimit: 50,
    facilitators: [
      "•	Safina Binte Enayet",
      "•	Kazi Rumana Haque",
      "•	Zayed Bin Farid ",
    ],
    registeredStudents: [],
  },
  {
    image: "https://i.ibb.co/R4hGwQk/Increase-Attention-through-Yoga-and-Meditation-1.png",
    title: "Increase Self-Awareness and Concentration through Yoga and Meditation",
    objective: `The main objective of the workshop is to introduce the art of living a peaceful life. 
      Moreover, the participants will get a unique opportunity to improve their self-awareness, 
      concentration and confidence which will help them to improve their academic performance. `,
    date: "15th June 2023 (Thursday)",
    time: "7:00 pm - 8:30 pm",
    venue: "Markuli Hall",
    seatLimit: 50,
    facilitators: [
      "•	Safina Binte Enayet",
      "•	Kazi Rumana Haque",
      "•	Zayed Bin Farid ",
    ],
    registeredStudents: [],
  },
]

const Workshops = () => {
  
  // const [seminars, setSeminars] = useState<SeminarInterface[] | null>();
 
  // useEffect(() => {

  //   const getData = async () => {
  //     const res = await axios.get(`${apiEndpointV1}/seminar`)
  //     setSeminars(res.data.data)
  //   }

  //   getData()
  // }, [])
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-4">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                RS Workshops
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          <section className="text-gray-400 bg-gray-900 body-font">
            {workshops ? (
              <div className="container py-4 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {workshops.map((workshop: WorkshopInterface, index: number) => (
                    <MultiPurposeCard props={workshop} key={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Workshops;
