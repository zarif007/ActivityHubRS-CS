'use client'
import { SeminarInterface } from "@/types/seminar";
import Link from "next/link";
import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { CgPin } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { colorSchema } from "@/lib/ColorSchema";


const Seminars = () => {
    const styles = {
        button: `${colorSchema.button} mx-auto mb-4 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
      };
  const [seminars, setSeminars] = useState<SeminarInterface[] | null>([
    {
      name: "Seminar on Awareness on Addiction",
      image: "https://i.ibb.co/Qdq0STZ/BRAC-programs-drug-addiction-1.png",
      details: `The session&#39;s objectives were to create awareness of addiction, empower the students to take
    preventive measures to say no to drugs & addictive behaviors and support their friends to get rid of
    them. The session was conducted by renowned Psychologist Professor Mehtab Khanam, Adviser of the
    Counseling Unit, BRAC University.`,
      keySpeaker: `Psychologist Professor Mehtab Khanam, Adviser of the Counseling Unit, BRAC University.`,
      venue: "AnandoPur",
      date: "24th May, 2023",
      registeredStudents: 1024,
      gender: "Both",
    },
    {
      name: "Seminar on Digital rights & responsibilities",
      image: "https://i.ibb.co/2N0W8y3/Brac-Digital-Rights-Program.png",
      details: `The session objective is to re-thinking rights & responsibilities in cyberspace. It will help you to
    understand freedom vs. Restrictions and how to maintain the fine balance? Therefore, we need
    reasonable restrictions on online activities.`,
      keySpeaker: `Sr. Lecturer, School of Law, BRAC University, Member, Artificial Intelligence Working
    Group, HAC. Advocate, District & Sessions Judge Court, Dhaka`,
      venue: "AnandoPur",
      date: "24th May, 2023",
      registeredStudents: 945,
      gender: "Both",
    },
  ]);
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-4">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                RS Seminars
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          <section className="text-gray-400 bg-gray-900 body-font">
            {
                seminars ? <div className="container py-4 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {
                    seminars.map((seminar: SeminarInterface, index: number) => (
                        <div className="p-4 md:w-1/3" key={index}>
                    <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={seminar.image}
                        alt="Seminar Image"
                        style={{ objectFit: "contain" }}
                      />
                      <div className="p-6">
                        <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase flex flex-wrap space-x-4">
                            <div className="flex items-center space-x-1">
                                <BiTimeFive /> <p>{seminar.date}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <CgPin /> <p>{seminar.venue}</p>
                            </div>
                            
                          </h3>
                        <h1 className="title-font text-xl md:text-2xl font-bold text-white mb-3">
                          {seminar.name}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {
                            seminar.details.slice(0, 100)
                          } ...
                        </p>
                        <div className="flex items-center flex-wrap ">
                          <div className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer text-md">
                            Register
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </div>
                          <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md pr-3 py-1">
                            <FaUsers className="mr-1" />
                            {seminar.registeredStudents}
                          </span>
                        </div>
                      </div>
                      <div className="mx-6">
                      <Link
                            href={`/activities/`}
                            className={styles.button}
                          >
                            Details
                          </Link>
                      </div>
                    </div>
                    
                  </div>
                    ))
                  }
                </div>
              </div> : <></>
            }
          </section>
        </div>
      </section>
    </div>
  );
};

export default Seminars;
