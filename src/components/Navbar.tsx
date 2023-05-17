'use client'

import Image from "next/image";
import React from "react";
import { GiPublicSpeaker, GiStairsGoal } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { BsPersonWorkspace } from "react-icons/bs";

const Navbar = () => {

  const router = useRouter();

  const styles = {
    wrapper: `p-2 fixed max-w-7xl mx-auto w-full backdrop-blur-sm z-50 top-0 left-0 right-0 h-16 md:h-20 shadow-sm 
      flex items-center justify-between rounded-sm`,
    optionStyles: `flex space-x-2 items-center justify-center shadow-2xl font-extrabold text-2xl 
      text-white cursor-pointer no-underline hover:underline decoration-indigo-500`,
  };

  return (
    <div className={styles.wrapper}>

      {/* Logo */}
      <Image src="/logo.png" className="cursor-pointer" height="60" width="60" alt="logo" onClick={() => router.push('/')} />

      {/* Options on Navbar */}
      <div className="flex space-x-3 md:space-x-8">
        <h1 className={styles.optionStyles} onClick={() => router.push('/activities')} >
          <GiStairsGoal />
          <p className="hidden md:flex">Activities</p>
        </h1>
        <h1 className={styles.optionStyles} onClick={() => router.push('/registeractivity')} >
          <BiLogIn />
          <p className="hidden md:flex">Register</p>
        </h1>
        <h1 className={styles.optionStyles} onClick={() => router.push('/registeractivity')} >
          <GiPublicSpeaker />
          <p className="hidden md:flex">Seminars</p>
        </h1>
        <h1 className={styles.optionStyles} onClick={() => router.push('/registeractivity')} >
          <BsPersonWorkspace />
          <p className="hidden md:flex">Workshops</p>
        </h1>
      </div>

    </div>
  );
};

export default Navbar;
