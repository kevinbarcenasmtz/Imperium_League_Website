import { Container } from "@/components/Container";
import Link from "next/link";

export default function StandingsPage() {
  // Sample data for standings (replace with API or database call)
  const standings = [
    { position: 1, team: "Team A", played: 10, won: 8, drawn: 1, lost: 1, points: 25 },
    { position: 2, team: "Team B", played: 10, won: 7, drawn: 2, lost: 1, points: 23 },
    { position: 3, team: "Team C", played: 10, won: 6, drawn: 3, lost: 1, points: 21 },
    { position: 4, team: "Team D", played: 10, won: 5, drawn: 2, lost: 3, points: 17 },
    { position: 5, team: "Team E", played: 10, won: 4, drawn: 1, lost: 5, points: 13 },
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
