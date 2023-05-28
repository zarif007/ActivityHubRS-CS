"use client";

import { ActivityRegStudentTable } from "@/components/ActivityRegStudentTable.";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { colorSchema } from "@/lib/ColorSchema";
import { RegistrationInterface } from "@/types/registration";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const registrationDays = [0, 1, 2, 3];

interface activityRegistrationInfoInterface {
  _id?: string;
  isRegistrationOpen: boolean;
  registrationDay: number;
  session: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number
}

const AdminDashboard = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 
      focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 
      transition-colors duration-200 ease-in-out`,
    exportButton: `${colorSchema.button} cursor-pointer flex p-3  max-w-lg font-extrabold text-l rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [secretKey, setSecretKey] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [clicked, setClicked] = useState<boolean>(false);

  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInterface[]>([]);

  const [activityRegistrationInfo, setActivityRegistrationInfo] = useState<activityRegistrationInfoInterface>({
    isRegistrationOpen: true,
    registrationDay: 1,
    session: "Summer2023",
    _id: '0',
  });

  const handleSecretkeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (secretKey === 'ABCD') {
      setIsAdmin(true)
    } else {
      setError('Invalid Secret key')
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;

    const getInfo = async () => {
      const res = await axios.get(`${apiEndpointV1}/registration`)
      setRegistrationInfo(res.data.data)
    }

    getInfo()
  }, [isAdmin])


  const handleUpdateRegistrationInfo = async () => {
      const res = await axios.put(`${apiEndpointV1}/admin?session=Summer2023`, {
        adminDashboard: activityRegistrationInfo
      })
      if(res.status === 200) {
        toast({
          title: "Success",
          message: 'Updated!!!',
          type: "success",
        });
      } else {
        toast({
          title: "Error",
          message: 'Something went wrong',
          type: "success",
        });
      }
  }

  useEffect(() => {
    if(clicked)
      handleUpdateRegistrationInfo()
  }, [activityRegistrationInfo])


  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`${apiEndpointV1}/admin?session=Summer2023`)
      setActivityRegistrationInfo(res.data.data[0])
    }
    getInfo()
  }, [])

  return (
    <div className={styles.wrapper}>
      {!isAdmin ? (
        <form onSubmit={handleSecretkeySubmit} className="w-full max-w-lg">
          <label className={styles.label}>Secret key</label>
          <Input
            defaultValue={secretKey}
            placeholder="Secret key"
            onChange={(e) => setSecretKey(e.target.value)}
          />
          {error !== '' && <p className="mt-2 text-sm text-red-500 font-semibold">{error}</p>}
          <button
            className={styles.button}
            disabled={loading || secretKey.length === 0}
            type="submit"
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-5xl">
          {
            activityRegistrationInfo._id !== '0' ? <div className="my-6 p-3 border-2 border-gray-800">
              <h1 className="text-indigo-500 font-extrabold text-4xl mb-2">Activity Registration Controller</h1>
              <div className="flex space-x-4 items-center">
            <h1 className="my-2 font-bold text-xl text-white">Turn on registration</h1>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500"
              checked={activityRegistrationInfo.isRegistrationOpen}
              onChange={(e) => {
                setActivityRegistrationInfo({ ...activityRegistrationInfo, isRegistrationOpen: e.target.checked })
                setClicked(true)
              }}
            />
          </div>
          <h1 className="my-2 font-bold text-xl text-white">Select Activity Registration Day</h1>
          <select
              id="large"
              className={styles.select}
              defaultValue={activityRegistrationInfo.registrationDay}
              onChange={(e) => {
                setActivityRegistrationInfo({ ...activityRegistrationInfo, registrationDay: e.target.value !== "" ? parseInt(e.target.value) : 1 })
                setClicked(true)
              }}
            >
              <option value="">Select registration date</option>
              
              {
                registrationDays.map((day: number) => (
                  <option key={day} value={day}>
                    {day}
                </option>
                ))
              }
            </select>
            </div> : <h1 className="text-white font-semibold">Loading....</h1>
          }
          <div className="flex items-center justify-between">
            <h1 className="my-2 font-bold text-xl text-white">Registered Students to an activity</h1>
            <Link
              href={`${apiEndpointV1}/registration/export`}
              className={styles.exportButton}
            >
              Export
            </Link>
          </div>

          <ActivityRegStudentTable registrationInfo={registrationInfo} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
