"use client";

import { Input } from "@/components/ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { FiCornerRightDown } from "react-icons/fi";
import allActivities from "@/lib/temp_getactivities";

interface RegistrationInputsInterface {
  email: string;
  phoneNumber: string;
  activityId: string;
}

const RegisterActivity = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`,
  };

  const [isTCChecked, setIsTCChecked] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [registrationInputs, setRegistrationInputs] =
    useState<RegistrationInputsInterface>({
      email: "",
      phoneNumber: "",
      activityId: "",
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (registrationInputs.activityId === "") {
      console.log(registrationInputs.activityId);
      setError("You must select an activity");
      return;
    }

    if (!isTCChecked) {
      setError("Without accepting terms and conditions, you can not register");
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        {/* Top heading */}
        <h1 className="text-4xl font-extrabold mb-5 text-white flex space-x-2 justify-center items-center">
          <p>Register Activity</p>
          <FiCornerRightDown className="mt-8 text-indigo-500" />
        </h1>
        {/* G Suite taker input */}
        <div className="my-3">
          <label className={styles.label}>
            G-Suite <span className="text-red-500 text-lg">*</span>
          </label>
          <Input
            placeholder="***@g.bracu.ac.bd"
            onChange={(e) =>
              setRegistrationInputs({
                ...registrationInputs,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Phone number taker input */}
        <div className="my-3">
          <label className={styles.label}>
            Phone Number <span className="text-red-500 text-lg">*</span>
          </label>
          <Input
            placeholder="01********"
            onChange={(e) =>
              setRegistrationInputs({
                ...registrationInputs,
                phoneNumber: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Activity taker dropdown */}
        <div className="my-3">
          <label className={styles.label}>
            Select an Activity <span className="text-red-500 text-lg">*</span>
          </label>
          <select
            id="large"
            className={styles.select}
            onChange={(e) =>
              setRegistrationInputs({
                ...registrationInputs,
                activityId: e.target.value,
              })
            }
          >
            <option value="">Select Activity</option>

            {allActivities.map((activity) => (
              <option key={activity.Name} value={activity.Name}>
                {activity.Name + " -> " + activity["Class time"]}
              </option>
            ))}
          </select>
        </div>

        {/* T/C taker checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-500"
            checked={isTCChecked}
            onChange={(e) => setIsTCChecked(e.target.checked)}
          />
          <label htmlFor="radio-button" className={styles.label}>
            I Agree with the terms and conditions{" "}
            <span className="text-red-500 text-lg">*</span>
          </label>
        </div>

        {error !== "" && (
          <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
        )}

        {/* Confirmation button */}
        <button className={`${styles.button}`}>
          <p>Confirm</p>
          <HiArrowRight />
        </button>
      </form>
    </div>
  );
};

export default RegisterActivity;
