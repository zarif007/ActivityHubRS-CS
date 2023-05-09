"use client";

import { Input } from "@/components/ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { FiCornerRightDown } from "react-icons/fi";

const RegisterActivity = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        {/* Top heading */}
        <h1 className="text-4xl font-extrabold mb-5 text-white flex space-x-2 justify-center items-center">
          <p>Register Activity</p>
          <FiCornerRightDown className="mt-8" />
        </h1>
        {/* G Suite taker input */}
        <div className="my-3">
          <label className={styles.label}>
            G-Suite <span className="text-red-500 text-lg">*</span>
          </label>
          <Input placeholder="***@g.bracu.ac.bd" required />
        </div>

        {/* Phone number taker input */}
        <div className="my-3">
          <label className={styles.label}>
            Phone Number <span className="text-red-500 text-lg">*</span>
          </label>
          <Input placeholder="01********" required />
        </div>

        {/* Activity taker dropdown */}
        <div className="my-3">
          <label className={styles.label}>
            Select an Activity <span className="text-red-500 text-lg">*</span>
          </label>
          <select id="large" className={styles.select}>
            <option></option>
            <option value="US">Web dev biggener sec 1</option>
            <option value="CA">Web dev biggener sec 2</option>
            <option value="FR">Web dev Advance sec 1</option>
            <option value="DE">App dev sec 1</option>
            <option value="DE">Game dev sec 1</option>
          </select>
        </div>

        {/* T/C taker checkbox */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 text-blue-500 " />
          <label htmlFor="radio-button" className={styles.label}>
            I Agree with terms and conditions{" "}
            <span className="text-red-500 text-lg">*</span>
          </label>
        </div>

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
