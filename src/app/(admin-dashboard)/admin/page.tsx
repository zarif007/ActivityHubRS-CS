"use client";

import { Input } from "@/components/ui/Input";
import { colorSchema } from "@/lib/ColorSchema";
import React, { useState } from "react";

const AdminDashboard = () => {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} cursor-pointer mt-8 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [secretKey, setSecretKey] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if(secretKey === 'ABCD') {
        setIsAdmin(true)
    } else {
        setError('Invalid Secret key')
    }

    setLoading(false);
  };

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
        <div>Admin</div>
      )}
    </div>
  );
};

export default AdminDashboard;
