"use client";

import { SeminarInterface } from "@/types/seminar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import MultiPurposeCard from "@/components/ui/MultiPurpose.Card";
import LoadingSpinner from "./../../../components/ui/LoadingSpinner";
import MultiPurposeRegistrationModal from "@/components/MultiPurposeRegistration.Modal";
import { colorSchema } from "@/lib/ColorSchema";

const Seminars = () => {
  const styles = {
    button: `${colorSchema.button} mx-auto mb-4 flex py-2 w-fit py-2 px-4 max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 cursor-pointer`,
  };
  const [seminars, setSeminars] = useState<SeminarInterface[] | null>();
  const [filteredSeminars, setFilteredSeminars] = useState<
    SeminarInterface[] | null
  >();

  const [selected, setSelected] = useState<{ option: string; text: string }>({
    option: "mandatory",
    text: "You must select only one from here.",
  });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiEndpointV1}/seminar`);
      setSeminars(res.data.data);
      setFilteredSeminars(
        res.data.data.filter((re: any) => re.type === selected.option)
      );
    };
    // getData();
  }, []);

  const handleFilterSeminar = (option: string, text: string) => {
    setSelected({ option, text });
    if (!seminars || seminars.length === 0) return;
    setFilteredSeminars(seminars.filter((re: any) => re.type === option));
  };
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto bg-gray-900">
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-4 justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                RS Seminars
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            {/* <div>
              <button
                className={styles.button}
                onClick={() => setIsRegistrationModalOpen(true)}
              >
                Register
              </button>
            </div> */}
          </div>
          {/* <div className="flex justify-start">
            <div className="flex space-x-2">
              <button
                className={styles.button}
                onClick={() =>
                  handleFilterSeminar(
                    "mandatory",
                    "You must select only one from here."
                  )
                }
              >
                Mandatory
              </button>
              <button
                className={styles.button}
                onClick={() => handleFilterSeminar("optional", "Optional")}
              >
                Optional
              </button>
            </div>
          </div> */}

          {/* <h1 className="my-2 font-bold text-lg text-indigo-500">
            {selected.text}
          </h1> */}

          {/* <section className="text-gray-400 bg-gray-900 body-font">
            {filteredSeminars ? (
              <div className="container py-4 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {filteredSeminars.map(
                    (seminar: SeminarInterface, index: number) => (
                      <MultiPurposeCard props={seminar} key={index} />
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
          </section> */}
          <h1 className="flex justify-center items-center py-24 text-2xl font-bold text-white">
            Will be Announced
          </h1>
        </div>
      </section>
      {/* {filteredSeminars && (
        <MultiPurposeRegistrationModal
          isOpen={isRegistrationModalOpen}
          setIsOpen={setIsRegistrationModalOpen}
          options={filteredSeminars}
          dedicated={false}
        />
      )} */}
    </div>
  );
};

export default Seminars;
