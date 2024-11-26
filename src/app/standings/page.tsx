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
    <Container className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] mb-4">League Standings</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Keep track of the league's top teams, their matches, and their points as they compete for glory!
        </p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Position</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Team</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Played</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Won</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Drawn</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Lost</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
                key={team.position}
                className={`text-sm text-gray-700 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition duration-200`}
              >
                <td className="px-4 py-3">{team.position}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{team.team}</td>
                <td className="px-4 py-3">{team.played}</td>
                <td className="px-4 py-3">{team.won}</td>
                <td className="px-4 py-3">{team.drawn}</td>
                <td className="px-4 py-3">{team.lost}</td>
                <td className="px-4 py-3 font-bold text-[#ED2939]">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
