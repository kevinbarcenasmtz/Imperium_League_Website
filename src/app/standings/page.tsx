// /src/app/standings/page.tsx
import { Container } from "@/components/Container";

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

    <Container className="flex flex-wrap">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">League Standings</h1>
        <table className="w-full table-auto border-collapse border border-gray-400">
            <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Position</th>
                <th className="border border-gray-400 px-4 py-2">Team</th>
                <th className="border border-gray-400 px-4 py-2">Played</th>
                <th className="border border-gray-400 px-4 py-2">Won</th>
                <th className="border border-gray-400 px-4 py-2">Drawn</th>
                <th className="border border-gray-400 px-4 py-2">Lost</th>
                <th className="border border-gray-400 px-4 py-2">Points</th>
            </tr>
            </thead>
            <tbody>
            {standings.map((team) => (
                <tr key={team.position} className="text-center">
                <td className="border border-gray-400 px-4 py-2">{team.position}</td>
                <td className="border border-gray-400 px-4 py-2">{team.team}</td>
                <td className="border border-gray-400 px-4 py-2">{team.played}</td>
                <td className="border border-gray-400 px-4 py-2">{team.won}</td>
                <td className="border border-gray-400 px-4 py-2">{team.drawn}</td>
                <td className="border border-gray-400 px-4 py-2">{team.lost}</td>
                <td className="border border-gray-400 px-4 py-2">{team.points}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </Container>
  );
}
