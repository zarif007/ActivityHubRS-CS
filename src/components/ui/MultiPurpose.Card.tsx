import { SeminarInterface } from '@/types/seminar'
import { WorkshopInterface } from '@/types/workshop'
import React, { useState } from 'react'
import { BiTimeFive } from "react-icons/bi";
import { CgPin } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import { colorSchema } from "@/lib/ColorSchema";
import MultiPurposeRegistrationModal from '../MultiPurposeRegistration.Modal';


const MultiPurposeCard = ({ props }: { props: SeminarInterface | WorkshopInterface }) => {
  const styles = {
    button: `${colorSchema.button} mx-auto mb-4 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 cursor-pointer`,
  };

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false)

  const isSeminar = (props: SeminarInterface | WorkshopInterface): props is SeminarInterface => 'name' in props

  return (
    <div className="p-2 md:w-1/3">
      <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={props.image}
          alt="Seminar Image"
          style={{ objectFit: "contain" }}
        />
        <div className="p-6">
          <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase flex flex-wrap justify-between">
            <div className="flex items-center space-x-1">
              <BiTimeFive /> <p>{!isSeminar(props) && props.time} {props.date}</p>
            </div>
            <div className="flex items-center space-x-1">
              <CgPin /> <p>{props.venue}</p>
            </div>
          </h3>
          <h1 className="title-font text-xl md:text-2xl font-bold text-white mb-3 h-16 truncate-text-2-lines">
            {
              isSeminar(props) ? props.name : props.title
            }
          </h1>
          <p className="leading-relaxed mb-3 truncate-text-3-lines">
            {
              isSeminar(props) ? props.details : props.objective
            }
          </p>
          <div className="flex items-center flex-wrap ">
            <Link href={`/activities/`} className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer text-md">
              Details
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
            </Link>
            <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md pr-3 py-1">
              <FaUsers className="mr-1" />
              {props.registeredStudents.length} { !isSeminar(props) && `/ ${props.seatLimit}` }
            </span>
          </div>
        </div>
        <div className="mx-6">
          <div className={styles.button} onClick={() => setIsRegistrationModalOpen(true)}>
            Register
          </div>
        </div>
      </div>

      <MultiPurposeRegistrationModal 
        isOpen={isRegistrationModalOpen} 
        setIsOpen={setIsRegistrationModalOpen} 
        options={new Array(props)} 
        dedicated={true}
      />
    </div>
  )
}

export default MultiPurposeCard
