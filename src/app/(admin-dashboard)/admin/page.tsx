"use client";

import { ActivityRegStudentTable } from "@/components/ActivityRegStudentTable.";
import { Input } from "@/components/ui/Input";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { colorSchema } from "@/lib/ColorSchema";
import { RegistrationInterface } from "@/types/registration";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    exportButton: `${colorSchema.button} cursor-pointer flex p-3  max-w-lg font-extrabold text-l rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [secretKey, setSecretKey] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInterface[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={styles.wrapper}>
      {!isAdmin ? (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
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
          <div className="flex space-x-4 items-center">
            <h1 className="my-2 font-bold text-xl text-white">Turn on registration</h1>
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500"
              onChange={(e) => {
              }}
            />
          </div>
          <Input placeholder="Day" className="my-4" />
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
