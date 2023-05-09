import React from "react"


export default function Home() {
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `bg-blue-600 hover:bg-blue-700 py-4 w-full max-w-lg font-bold text-lg text-white rounded-sm`
  }
  return (
    <main className={styles.wrapper}>
      <button className={styles.button}>
        View activities
      </button>
      <button className={styles.button}>
        Register activities
      </button>
    </main>
  )
}
