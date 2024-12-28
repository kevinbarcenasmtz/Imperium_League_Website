"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { FaUserPlus, FaSave, FaArrowLeft, FaTimes } from "react-icons/fa";

type Player = {
  id: string;
  name: string;
  number?: number | null;
  position?: string | null;
  teamId: string;
};

type Team = {
  id: string;
  name: string;
  players: Player[];
};

export default function EditTeam() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState({ 
    name: "", 
    number: "", 
    position: "" 
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        console.log("Fetching team data...");
        const response = await fetch(`/api/teams/${params.teamId}`);
        const data = await response.json();
        console.log("Fetched team data:", data);

        if (data.success) {
          setTeam(data.team);
          setTeamName(data.team.name);
          setPlayers(data.team.players);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        setError("Failed to fetch team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [params.teamId]);

  const handleAddPlayer = () => {
    if (!newPlayer.name.trim()) return;

    console.log("Adding new player:", newPlayer);
    
    // Convert number string to number or null if empty
    const playerNumber = newPlayer.number ? parseInt(newPlayer.number) : null;
    
    const newPlayerObj: Player = {
      id: `temp-${Date.now()}`,
      name: newPlayer.name.trim(),
      number: playerNumber,
      position: newPlayer.position.trim() || null,
      teamId: params.teamId as string
    };

    console.log("Created player object:", newPlayerObj);
    setPlayers(currentPlayers => {
      const updatedPlayers = [...currentPlayers, newPlayerObj];
      console.log("Updated players list:", updatedPlayers);
      return updatedPlayers;
    });
    
    setNewPlayer({ name: "", number: "", position: "" });
  };

  const handleRemovePlayer = (playerId: string) => {
    console.log("Removing player:", playerId);
    setPlayers(currentPlayers => {
      const updatedPlayers = currentPlayers.filter(player => player.id !== playerId);
      console.log("Updated players list after removal:", updatedPlayers);
      return updatedPlayers;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", { teamName, players });
    
    setSaving(true);
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required");
      setSaving(false);
      return;
    }

    // Prepare players data according to Prisma schema
    const preparedPlayers = players.map(player => ({
      name: player.name,
      number: player.number ?? null,
      position: player.position ?? null
    }));

    console.log("Prepared players data:", preparedPlayers);

    try {
      const response = await fetch(`/api/teams/${params.teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamName.trim(),
          players: preparedPlayers,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Failed to update team");
      }
    } catch (err) {
      console.error("Error saving team:", err);
      setError("Failed to update team");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit Team</h1>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            <FaArrowLeft className="inline mr-2" /> Back
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Name Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-xl font-semibold text-gray-800 mb-4">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
            />
          </div>

          {/* Players Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Players</h2>
            
            {/* Add Player Section */}
            <div className="mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, name: e.target.value })
                  }
                  placeholder="Player Name"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
                />
                <input
                  type="number"
                  value={newPlayer.number}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, number: e.target.value })
                  }
                  placeholder="Number"
                  className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
                />
                <input
                  type="text"
                  value={newPlayer.position}
                  onChange={(e) =>
                    setNewPlayer({ ...newPlayer, position: e.target.value })
                  }
                  placeholder="Position"
                  className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
                />
                <button
                  type="button"
                  onClick={handleAddPlayer}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FaUserPlus className="inline mr-2" /> Add
                </button>
              </div>
            </div>

            {/* Players List */}
            <div className="space-y-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <span className="font-semibold">{player.name}</span>
                    {player.number && (
                      <span className="ml-2 text-gray-600">#{player.number}</span>
                    )}
                    {player.position && (
                      <span className="ml-2 text-gray-500">({player.position})</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {players.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No players added yet
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className={`w-full px-6 py-3 bg-[#ED2939] text-white font-bold rounded-lg hover:bg-[#C62631] flex items-center justify-center ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaSave className="mr-2" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Container>
  );
}