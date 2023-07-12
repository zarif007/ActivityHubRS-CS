"use client";

import { SeminarInterface } from "@/types/seminar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import MultiPurposeCard from "@/components/ui/MultiPurpose.Card";
import LoadingSpinner from './../../../components/ui/LoadingSpinner';
import MultiPurposeRegistrationModal from "@/components/MultiPurposeRegistration.Modal";
import { colorSchema } from "@/lib/ColorSchema";

const Seminars = () => {
  const styles = {
    button: `${colorSchema.button} mx-auto mb-4 flex py-2 w-fit py-2 px-4 max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 cursor-pointer`,
  };
  const [seminars, setSeminars] = useState<SeminarInterface[] | null>();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false)
  useEffect(() => {

    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/seminar`)
      setSeminars(res.data.data)
    }

    getData()
  }, [])
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
              <div>
                <button className={styles.button} onClick={() => setIsRegistrationModalOpen(true)}>Register</button>
              </div>
            </div>
          </div>

          <section className="text-gray-400 bg-gray-900 body-font">
            {seminars ? (
              <div className="container py-4 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {seminars.map((seminar: SeminarInterface, index: number) => (
                    <MultiPurposeCard props={seminar} key={index} />
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
      {
        seminars && <MultiPurposeRegistrationModal 
          isOpen={isRegistrationModalOpen} 
          setIsOpen={setIsRegistrationModalOpen} 
          options={seminars} 
          dedicated={false}
        />
      }
    </div>
  );
};

export default Seminars;
