'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const AuthProviders = ({ children }: any) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProviders
