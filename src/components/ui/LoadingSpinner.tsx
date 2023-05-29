import React from 'react'

const LoadingSpinner = () => {
  return (
    <span className="relative flex h-16 w-16">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-16 w-16 bg-indigo-600"></span>
    </span>
  )
}

export default LoadingSpinner
