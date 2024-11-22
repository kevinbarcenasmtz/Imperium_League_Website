// /src/app/leagues/page.tsx
'use client';
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
    <Container className="flex flex-wrap">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Leagues</h1>
        <div className="space-y-4">
          {leagues.map((league, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">{league.name}</h2>
              <p className="text-gray-600">Founded: {league.founded}</p>
              <p className="text-gray-600">Teams: {league.teams}</p>
              <p className="text-gray-600">Country: {league.country}</p>
              <button
                onClick={() => alert(`You clicked on ${league.name}`)} // Custom action, replace as needed
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                View League Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
