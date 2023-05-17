"use client";

import { Input } from "@/components/ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { FiCornerRightDown } from "react-icons/fi";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { ActivityInterface } from "@/types/activity";
import { toast } from "@/components/ui/Toast";
import { Progress } from "@/components/ui/Progress";

interface RegistrationInputsInterface {
  email: string;
  phoneNumber: string;
  activityId: string;
}

const progressEmojis = ['👍', '😎', '🤩', '🚀', '🔥']

const RegisterActivity = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} mt-6 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm 
      items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 
      focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 
      transition-colors duration-200 ease-in-out`,
  };

  const [isTCChecked, setIsTCChecked] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [progressCounter, setProgressCounter] = useState({
    step: 1,
    i1: 0,
    i2: 0,
    i3: 0,
    i4: 0,
  });

  const [activities, setActivities] = useState<ActivityInterface[]>([]);

  const [registrationInputs, setRegistrationInputs] =
    useState<RegistrationInputsInterface>({
      email: "",
      phoneNumber: "",
      activityId: "",
    });

  useEffect(() => {
    const getActivities = async () => {
      const res = await axios.get(`${apiEndpointV1}/activity`);
      setActivities(res.data.data);
    };

    getActivities();
  }, []);

  const updateProgressCounter = (atr: 'i1' | 'i2' | 'i3' | 'i4', value: string) => {
    const up = progressCounter;
    if(value !== '') {
      up[`${atr}`] = Math.min(1, up[`${atr}`] + 1)
    } else {
      up[`${atr}`] = Math.max(0, up[`${atr}`] - 1)
    }

    up.step = up.i1 + up.i2 + up.i3 + up.i4 + 1;
    setProgressCounter(up)
  }

  const registrationErrorHandling = (errMsg: string) => {
    toast({
      title: "Error",
      message: errMsg,
      type: "error",
    });
    setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (isLoading) return;

    if (registrationInputs.activityId === "") {
      setError("You must select an activity");
      return;
    }

    if (!isTCChecked) {
      setError("Without accepting terms and conditions, you can not register");
      return;
    }

    setIsLoading(true);

    try {
      // Checking if there is any student with this email
      const studentRes = await axios.get(
        `${apiEndpointV1}/student/byEmail/${registrationInputs.email}`
      );

      if (studentRes.data.data === null) {
        registrationErrorHandling('Invalid Email iD, check and try again')
        return;
      }

      // Checking if this user already registered or not
      const isAlreadyRegistered = await axios.get(
        `${apiEndpointV1}/registration/byStudentId/${studentRes.data.data._id}`
      );

      if (isAlreadyRegistered.data.data.length !== 0) {
        registrationErrorHandling('This email has already enrolled to an activity')
        return;
      }

      // Checking if there is any available seat
      const activityStateRes = await axios.get(
        `${apiEndpointV1}/activityState/${registrationInputs.activityId}`
      );

      if(activityStateRes.data.data.totalSeat - activityStateRes.data.data.bookedSeat <= 0){
        registrationErrorHandling('No available seat in this activity')
        return;
      }

      // Incrementing the booked seat number

      // Registering user to the activity 
      const regObj = {
        activityId: registrationInputs.activityId,
        studentId: studentRes.data.data._id,
        session: "Summer2023"
      }

      const res = await axios.post(`${apiEndpointV1}/registration`, regObj)
      
      if(res.status === 200) {
        toast({
          title: "Success",
          message: "Activity enrollment successful",
          type: "success",
        });
      } else {
        registrationErrorHandling("Something went wrong",)
      }
    } catch (err) {
      if (err instanceof Error) {
        registrationErrorHandling(err.message)
        return;
      }
      registrationErrorHandling("Something went wrong")
    } finally {
      setIsLoading(false);
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
            onChange={(e) => {
              setRegistrationInputs({
                ...registrationInputs,
                email: e.target.value,
              })
              updateProgressCounter('i1', e.target.value)
            }}
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
            onChange={(e) => {
              setRegistrationInputs({
                ...registrationInputs,
                phoneNumber: e.target.value,
              })
              updateProgressCounter('i2', e.target.value)
            }}
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
            onChange={(e) => {
              setRegistrationInputs({
                ...registrationInputs,
                activityId: e.target.value,
              })
              updateProgressCounter('i3', e.target.value)
            }}
          >
            <option value="">Select Activity</option>
            {activities.map((activity: ActivityInterface) => (
              <option key={activity._id} value={activity._id}>
                {activity.name} ({activity.day})
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
            onChange={(e) => {
              setIsTCChecked(e.target.checked)
              updateProgressCounter('i4', e.target.checked ? 'rr' : '')
            }}
          />
          <label htmlFor="radio-button" className={styles.label}>
            I Agree with the terms and conditions{" "}
            <span className="text-red-500 text-lg">*</span>
          </label>
        </div>

        <Progress value={progressCounter.step * 20} className="mt-2" />
        <p className={styles.label}>{progressCounter.step}/5 {progressEmojis[progressCounter.step - 1]}</p>

        {error !== "" && (
          <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
        )}

        {/* Confirmation button */}
        <button
          className={`${styles.button} disabled:bg-opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <p>Loading...</p>
            </>
          ) : (
            <>
              <p>Confirm</p>
              <HiArrowRight />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterActivity;
