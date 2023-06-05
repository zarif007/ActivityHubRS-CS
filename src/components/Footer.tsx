'use client'

import React from 'react'
import { FiCornerRightDown } from "react-icons/fi";
import { GrFacebook } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Footer = () => {
    const router = useRouter()
  return (
    <footer className="bg-black text-white py-4 font-bold text-lg">
        <p className="flex justify-center items-center tracking-wide">Made with ❤️ by <FiCornerRightDown className="mt-8 w-8 h-8 text-indigo-500 animate-bounce" /></p>
        <div className="flex justify-center items-center tracking-wide space-x-3 my-2">
            <p>🤖 ZARIF (BracU CSE)</p> 
            <Link href="https://www.facebook.com/zarif.khan.10004/" target="_blank"><GrFacebook className="cursor-pointer w-8 h-8 text-blue-600" /> </Link>
            <Link href="https://github.com/zarif007" target="_blank"><BsGithub className="w-8 h-8 text-white" /> </Link>
        </div>
        <div className="flex justify-center items-center tracking-wide space-x-3 my-2">
            <p>🤖 Danial (BracU CSE)</p> 
            <Link href="https://www.facebook.com/danialcodes/" target="_blank"><GrFacebook className="cursor-pointer w-8 h-8 text-blue-600" /> </Link>
            <Link href="https://github.com/danialcodes" target="_blank"><BsGithub className="w-8 h-8 text-white" /> </Link>
        </div>
        
    </footer>
  )
}

export default Footer
