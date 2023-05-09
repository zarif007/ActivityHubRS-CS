'use client'
import { colorSchema } from "@/lib/ColorSchema"
import { useRouter } from "next/navigation"
import React from "react"
import { GiStairsGoal } from 'react-icons/gi';
import { BiLogIn } from 'react-icons/bi';


export default function Home() {
  const router = useRouter()
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} flex py-4 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-4`
  }
  return (
    <main className={styles.wrapper}>
      <button className={styles.button} onClick={() => router.push('/activities')}>
        <GiStairsGoal className="w-8 h-8" />
        <p>View activities</p>
      </button>
      <button className={styles.button} onClick={() => router.push('/registeractivity')}>
        <BiLogIn className="w-8 h-8" />
        <p>Register activity</p>
      </button>
    </main>
  )
}
