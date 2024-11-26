"use client";
import { Container } from "@/components/Container";

export default function LeaguesPage() {
  // Sample data for leagues (replace with actual API data or database query)
  const leagues = [
    { name: "Premier League", teams: 20, founded: 1992, country: "England" },
    { name: "La Liga", teams: 20, founded: 1929, country: "Spain" },
    { name: "Serie A", teams: 20, founded: 1898, country: "Italy" },
    { name: "Bundesliga", teams: 18, founded: 1963, country: "Germany" },
    { name: "Ligue 1", teams: 20, founded: 1932, country: "France" },
  ];

  return (
    <Container className="py-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">Leagues</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Explore some of the our  soccer leagues in Austin, featuring incredible teams, diverse backgrounds, and unparalleled passion for the game.
        </p>
      </section>

      {/* League Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leagues.map((league, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{league.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Founded:</span> {league.founded}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Teams:</span> {league.teams}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Country:</span> {league.country}
            </p>
            <button
              onClick={() => alert(`You clicked on ${league.name}`)} // Custom action, replace as needed
              className="mt-4 w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md hover:bg-[#C62631] transition duration-200"
            >
              View League Details
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
