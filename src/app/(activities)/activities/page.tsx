"use client";

import AIActivitySuggestionModal from "@/components/AIActivitySuggestionModal";
import React from "react";
import { useState } from "react";
import { BsRobot } from "react-icons/bs";

const Activities = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto">
      <div
        className="flex justify-end font-bold text-md md:text-lg text-indigo-500 cursor-pointer space-x-2 items-center mx-2"
        onClick={() => setIsOpen(true)}
      >
        <p className="no-underline hover:underline decoration-indigo-500">
          Let AI chose for you
        </p>
        <BsRobot className="w-8 h-8" />
      </div>
      <AIActivitySuggestionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Activities;
