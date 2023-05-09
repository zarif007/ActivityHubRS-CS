import { colorSchema } from "@/lib/ColorSchema";
import Image from "next/image";
import React from "react";
import { GiStairsGoal } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const styles = {
    wrapper: `p-2 fixed max-w-7xl mx-auto w-full backdrop-blur-sm z-50 top-0 left-0 right-0 h-16 md:h-20 shadow-sm 
      flex items-center justify-between rounded-sm`,
    optionStyles: `flex space-x-2 items-center justify-center shadow-2xl font-extrabold text-xl md:text-2xl lg:text-3xl 
      text-white cursor-pointer no-underline hover:underline decoration-blue-600`,
  };
  return (
    <div className={styles.wrapper}>
      <Image src="/impact.png" height="60" width="60" alt="logo" />
      <div className="flex space-x-3 md:space-x-8">
        <h1 className={styles.optionStyles}>
          <GiStairsGoal />
          <p className="">Activities</p>
        </h1>
        <h1 className={styles.optionStyles}>
          <BiLogIn />
          <p>Register</p>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
