"use client";
import React, { useState } from "react";
import { Container } from "@/components/Container";
import { useRouter } from "next/navigation";

const RegisterTeamPage = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamCaptain, setTeamCaptain] = useState("");
  const [players, setPlayers] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const playersList = players
        .split('\n')
        .map(player => player.trim())
        .filter(player => player.length > 0);

      const formData = {
        teamName: teamName.trim(),
        teamCaptain: teamCaptain.trim(),
        players: playersList
      };

      const response = await fetch('/api/tournament/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register team');
      }

      router.push(`/tournament/confirmation?team=${encodeURIComponent(teamName)}&captain=${encodeURIComponent(teamCaptain)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Register Your Team</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill out the form below to register your team for the tournament. 
            We can&apos;t wait to see you on the field!
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#ED2939]
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="teamCaptain" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Team Captain Name
            </label>
            <input
              id="teamCaptain"
              type="text"
              value={teamCaptain}
              onChange={(e) => setTeamCaptain(e.target.value)}
              required
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#ED2939]
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="players" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              List of Players (one per line)
            </label>
            <textarea
              id="players"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#ED2939]
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter each player's name on a new line"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md transition duration-200 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C62631] dark:hover:bg-[#C62631]'}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterTeamPage;