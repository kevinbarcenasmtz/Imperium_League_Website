"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { FaUsers, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// Types for our team data
type Player = {
  id: string;
  name: string;
  number?: number;
};

type Team = {
  id: string;
  name: string;
  createdAt: Date;
  players: Player[];
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user's teams
  useEffect(() => {
    const fetchTeams = async () => {
      if (!session?.user?.id) return;
      
      try {
        const response = await fetch('/api/teams/user');
        const data = await response.json();
        
        if (data.success) {
          setTeams(data.teams);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [session?.user?.id]);

  if (status === "loading") {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      setError("User is not logged in or session is invalid.");
      return;
    }

    try {
      const response = await fetch('/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName }),
      });

      const data = await response.json();
      
      if (data.success) {
        setTeams([...teams, data.team]);
        setTeamName("");
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to create team');
    }
  };

  const handleEditTeam = async (team: Team) => {
    setEditingTeam(team);
    router.push(`/teams/edit/${team.id}`);
  };

  const handleDeleteTeam = async (teamId: string) => {
  if (!confirm('Are you sure you want to delete this team?')) return;

  try {
    const response = await fetch(`/api/teams/${teamId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    
    if (data.success) {
      // Update the teams state by filtering out the deleted team
      setTeams(currentTeams => currentTeams.filter(team => team.id !== teamId));
      setError(null);
    } else {
      setError(data.message || 'Failed to delete team');
    }
  } catch (error) {
    console.error('Error deleting team:', error);
    setError('Failed to delete team. Please try again.');
  }
};

  return (
    <Container className="py-12">
      {/* Welcome Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-[#ED2939] mb-4">
          Welcome, {session.user?.name || "Guest"}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
          Create and manage your teams to get started with the game. Let's organize and enjoy the fun!
        </p>
      </section>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Team Creation Section */}
      <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Team
        </h2>
        <form onSubmit={handleCreateTeam} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-xl text-gray-800 mb-2">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED2939] mb-4"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#ED2939] text-white font-bold rounded-lg hover:bg-[#C62631] flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Create Team
          </button>
        </form>
      </section>

      {/* Team Overview Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Teams
        </h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading teams...</div>
        ) : teams.length === 0 ? (
          <div className="text-center text-gray-600">You haven't created any teams yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <div key={team.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
                <p className="text-gray-700 mb-4">
                  Players: {team.players.length}
                </p>
                <p className="text-gray-700 mb-4">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditTeam(team)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <FaEdit className="inline mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FaTrash className="inline mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}