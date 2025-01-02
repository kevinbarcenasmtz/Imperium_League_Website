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
      console.log('Starting form submission');
      
      // Format the players data
      const playersList = players
        .split('\n')
        .map(player => player.trim())
        .filter(player => player.length > 0);

      const formData = {
        teamName: teamName.trim(),
        teamCaptain: teamCaptain.trim(),
        players: playersList
      };

      console.log('Sending data:', formData);

      const response = await fetch('/api/tournament/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register team');
      }

      // Redirect to confirmation page with team details
      router.push(`/tournament/confirmation?team=${encodeURIComponent(teamName)}&captain=${encodeURIComponent(teamCaptain)}`);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Register Your Team</h1>
          <p className="text-gray-600">
            Fill out the form below to register your team for the tournament. 
            We can&apost wait to see you on the field!
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
            />
          </div>

          <div>
            <label htmlFor="teamCaptain" className="block text-sm font-medium text-gray-700 mb-1">
              Team Captain Name
            </label>
            <input
              id="teamCaptain"
              type="text"
              value={teamCaptain}
              onChange={(e) => setTeamCaptain(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
            />
          </div>

          <div>
            <label htmlFor="players" className="block text-sm font-medium text-gray-700 mb-1">
              List of Players (one per line)
            </label>
            <textarea
              id="players"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
              placeholder="Enter each player's name on a new line"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-[#ED2939] text-white font-semibold rounded-md transition duration-200 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C62631]'}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterTeamPage;