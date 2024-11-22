"use client";

import React from "react";
import { Container } from "@/components/Container";

const CalendarPage = () => {
  return (
    <Container className="flex flex-wrap">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Calendar
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Stay updated with all the events and schedules.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example event cards */}
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Event Name
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Date: January 15, 2024
            </p>
            <p className="text-gray-600 dark:text-gray-300">Location: Online</p>
            <button className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Learn More
            </button>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Upcoming Tournament
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Date: February 20, 2024
            </p>
            <p className="text-gray-600 dark:text-gray-300">Location: New York</p>
            <button className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Register Now
            </button>
          </div>

          {/* Add more event cards as needed */}
        </div>
      </div>
    </Container>
  );
};

export default CalendarPage;
