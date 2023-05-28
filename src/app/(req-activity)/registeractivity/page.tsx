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
import { StudentInterface } from "@/types/student";
import { ActivityStateInterface } from "@/types/activityState";
// import { useSession } from "next-auth/react";

interface RegistrationInputsInterface {
  email: string;
  phoneNumber: string;
  activityId: string;
}

const progressEmojis = ["👍", "😎", "🤩", "🚀", "🔥"];

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

  // const { data: session } = useSession();

  // console.log('email', session?.user?.email);

  const [isTCChecked, setIsTCChecked] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [progressCounter, setProgressCounter] = useState({
    step: 1,
    i1: 0,
    i2: 0,
    i3: 0,
    i4: 0,
  });

  const [activities, setActivities] = useState<ActivityStateInterface[]>([]);

  const [registrationInputs, setRegistrationInputs] =
    useState<RegistrationInputsInterface>({
      email: "",
      phoneNumber: "",
      activityId: "",
    });

  const [studentInfo, setStudentInfo] = useState<StudentInterface | null>();

  useEffect(() => {
    const getActivities = async () => {
      const regInfo = await axios.get(`${apiEndpointV1}/admin?session=Summer2023`)
      const res = await axios.get(`${apiEndpointV1}/activityState?registrationDay=${regInfo.data.data[0].registrationDay}`);
      setActivities(res.data.data);
      setIsOpen(regInfo.data.data[0].isRegistrationOpen)
    };

    getActivities();
  }, []);

  useEffect(() => {
    const getStudentInfo = async () => {
      if (registrationInputs.email.endsWith("@g.bracu.ac.bd")) {
        setIsLoading(true);
        // Checking if there is any student with this email
        const studentRes = await axios.get(
          `${apiEndpointV1}/student/byEmail/${registrationInputs.email}`
        );

        setStudentInfo(studentRes.data.data);
        setIsLoading(false);
      } else {
        setStudentInfo(null);
      }
    };
    getStudentInfo();
  }, [registrationInputs.email]);

  const updateProgressCounter = (
    atr: "i1" | "i2" | "i3" | "i4",
    value: string
  ) => {
    const up = progressCounter;
    if (value !== "") {
      up[`${atr}`] = Math.min(1, up[`${atr}`] + 1);
    } else {
      up[`${atr}`] = Math.max(0, up[`${atr}`] - 1);
    }

    up.step = up.i1 + up.i2 + up.i3 + up.i4 + 1;
    setProgressCounter(up);
  };

  const registrationErrorHandling = (errMsg: string) => {
    toast({
      title: "Error",
      message: errMsg,
      type: "error",
    });
    setIsLoading(false);
  };

  const validateInputs = () => {
    if (registrationInputs.activityId === "") {
      setError("You must select an activity");
      return false;
    }

    if (!isTCChecked) {
      setError("Without accepting terms and conditions, you can not register");
      return false;
    }

    // Validating phone number ( +880 | 01 | 00 )
    if (
      !new RegExp(/^(?:(?:\+|00)88|01)?(?:\d{11}|\d{13})$/gm).test(
        registrationInputs.phoneNumber
      )
    ) {
      setError("Invalid phone number");
      return false;
    }

    // Checking if there is any student with this email
    if (studentInfo === null) {
      registrationErrorHandling("Invalid Email iD, check and try again");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (isLoading) return;

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      if (!studentInfo?._id) return;

      // Registering user to the activity
      const regObj = {
        activityId: registrationInputs.activityId,
        studentId: studentInfo._id,
        // session: "Summer2023", default in  model, so no need
        newPhoneNumber: registrationInputs.phoneNumber,
      };

      const { data } = await axios.post(
        `${apiEndpointV1}/registration`,
        regObj
      );
      const { smsResponse } = data.data;
      if (data.success === true && smsResponse[0].status === "SENT") {
        toast({
          title: "Success",
          message: smsResponse[0].message,
          type: "success",
        });
      }
    } catch (err: any) {
      registrationErrorHandling(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {
        isOpen ? <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
                });
                updateProgressCounter("i1", e.target.value);
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
                });
                updateProgressCounter("i2", e.target.value);
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
                });
                updateProgressCounter("i3", e.target.value);
              }}
            >
              <option value="">Select Activity</option>
              {activities.map((activity: ActivityStateInterface) => (
                <option key={activity.activityId._id} value={activity.activityId._id}>
                  {activity.activityId.name} ({activity.activityId.day})
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
                setIsTCChecked(e.target.checked);
                updateProgressCounter("i4", e.target.checked ? "rr" : "");
              }}
            />
            <label htmlFor="radio-button" className={styles.label}>
              I Agree with the terms and conditions{" "}
              <span className="text-red-500 text-lg">*</span>
            </label>
          </div>

          <Progress value={progressCounter.step * 20} className="mt-2" />
          <p className={styles.label}>
            {progressCounter.step}/5 {progressEmojis[progressCounter.step - 1]}
          </p>

          {error !== "" && (
            <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
          )}

          {studentInfo && (
            <div className="my-2 bg-indigo-500 bg-opacity-10 text-white text-sm font-semibold rounded-sm border-2 border-indigo-500 p-3">
              <p>{studentInfo.name}</p>
              <p>ID: {studentInfo.studentId}</p>
              <p>
                Phone Number: 0{studentInfo.phoneNumber.slice(0, 2)}*****
                {studentInfo.phoneNumber.slice(7, studentInfo.phoneNumber.length)}
              </p>
            </div>
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
        </form> : <h1 className="text-3xl font-bold text-white">Registration is closed. Will reopen on June 4th/5th/6th</h1>
      }
    </div>
  );
};

export default RegisterActivity;
