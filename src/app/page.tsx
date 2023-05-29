"use client";
import { colorSchema } from "@/lib/ColorSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { GiPublicSpeaker, GiStairsGoal } from "react-icons/gi";
import { MdAppRegistration } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";

export default function Home() {
  const router = useRouter();
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} flex py-4 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-4`,
  };
  return (
    <main className={styles.wrapper}>
      <div></div>
      {/* button groups */}
      <button
        className={styles.button}
        onClick={() => router.push("/activities")}
      >
        <GiStairsGoal className="w-8 h-8" />
        <div>
          <p>View activities</p>
          <p className="text-sm">extra co curricular</p>
        </div>
      </button>
      <button
        className={styles.button}
        onClick={() => router.push("/registeractivity")}
      >
        <MdAppRegistration className="w-8 h-8" />
        <p>Enroll activity</p>
      </button>
      <button
        className={styles.button}
        onClick={() => router.push("/seminars")}
      >
        <GiPublicSpeaker className="w-8 h-8" />
        <p>Seminars</p>
      </button>
      <button
        className={styles.button}
        onClick={() => router.push("/workshops")}
      >
        <BsPersonWorkspace className="w-8 h-8 " />
        <p>Workshops</p>
      </button>
      <button
        className={styles.button}
        onClick={() => router.push("/civic-engagements")}
      >
        <GiStairsGoal className="w-8 h-8 " />
        <div>
          <p>Civic Engagements</p>
          <p className="text-sm">(Project Srijon)</p>
        </div>
      </button>
    </main>
  );
}
