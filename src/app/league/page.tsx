"use client";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function LeaguesPage() {
  // Sample data for leagues (replace with actual API data or database query)
  const leagues = [
    { name: "Primera", teams: 16, founded: 2024, country: "Austin" },
    { name: "Segunda", teams: 16, founded: 2024, country: "Austin" },
    { name: "Tercera", teams: 16, founded: 2024, country: "Austin" },
    { name: "Co-Ed Primera", teams: 16, founded: 2024, country: "Austin" },
    { name: "Co-Ed Segunda", teams: 16, founded: 2024, country: "Austin" },
  ];

  return (
    <Container className="py-12 relative min-h-[60vh]">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-start pt-20 sm:justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#ED2939] mb-6 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          We&apos;re working hard to bring you exciting football news and insights. Stay tuned!
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}