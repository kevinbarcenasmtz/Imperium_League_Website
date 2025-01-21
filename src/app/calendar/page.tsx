"use client";

import React from "react";
import { Container } from "@/components/Container";
import { useRouter } from "next/navigation";

const CalendarPage = () => {
  const router = useRouter();

  return (
    <Container className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">Calendar</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto dark:text-white">
          Stay updated with all the events, schedules, and tournaments happening throughout the season. Don’t miss out!
        </p>
      </div>

      {/* Event Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Example Event Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Empire Football League
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Date:</span> Coming Soon
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Location:</span> Austin, Texas
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
          >
            Learn More
          </button>
        </div>

        {/* Example Event Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Empire Cash Prize V1 Tournament
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Date:</span> Coming Soon
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Location:</span> South Austin, Slaughter Ln
          </p>
          <button
            onClick={() => router.push("/tournament")}
            className="w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
          >
            Register Now
          </button>
        </div>

        {/* Additional Event Card */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Pickup Runs
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Date:</span> Weekly
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Location:</span> South Austin, Slaughter Ln
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
          >
            Support Now
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CalendarPage;
