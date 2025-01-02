"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { FaUserPlus, FaSave, FaArrowLeft, FaTimes } from "react-icons/fa";

type Player = {
  _id?: string;
  name: string;
  number?: number | null;
  position?: string | null;
  teamId: string;
};

type Team = {
  _id: string;
  name: string;
  players: Player[];
};

interface Props {
  teamId: string;
}

// Client-side validation for MongoDB ObjectId format
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export default function EditTeamForm({ teamId }: Props) {
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
        if (!teamId || teamId === 'undefined') {
          setError("Invalid team ID");
          setLoading(false);
          return;
        }

        if (!isValidObjectId(teamId)) {
          setError("Invalid team ID format");
          setLoading(false);
          return;
        }

        console.log("Fetching team data...");
        const response = await fetch(`/api/teams/${teamId}`);
        const data = await response.json();
        console.log("Fetched team data:", data);

        if (data.success) {
          setTeam(data.team);
          setTeamName(data.team.name);
          setPlayers(data.team.players.map((player: Player) => ({
            ...player,
            _id: player._id || `temp-${Date.now()}-${Math.random()}`
          })));
        } else {
          setError(data.message || "Failed to fetch team");
        }
      } catch (err) {
        console.error("Error fetching team:", err);
        setError("Failed to fetch team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleAddPlayer = () => {
    if (!newPlayer.name.trim()) return;
    
    const playerNumber = newPlayer.number ? parseInt(newPlayer.number) : null;
    
    const newPlayerObj: Player = {
      _id: `temp-${Date.now()}-${Math.random()}`,
      name: newPlayer.name.trim(),
      number: playerNumber,
      position: newPlayer.position.trim() || null,
      teamId: teamId
    };

    setPlayers(currentPlayers => [...currentPlayers, newPlayerObj]);
    setNewPlayer({ name: "", number: "", position: "" });
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(currentPlayers => currentPlayers.filter(player => player._id !== playerId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!teamName.trim()) {
      setError("Team name is required");
      setSaving(false);
      return;
    }

    const preparedPlayers = players.map(player => ({
      ...(player._id?.startsWith('temp-') ? {} : { _id: player._id }),
      name: player.name,
      number: player.number ?? null,
      position: player.position ?? null
    }));

    try {
      const response = await fetch(`/api/teams/${teamId}`, {
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

  if (loading) {
    return (
      <Container className="py-12">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
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

        <form onSubmit={handleSubmit} className="space-y-8">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Players</h2>
            
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

            <div className="space-y-4">
              {players.map((player) => (
                <div
                  key={player._id}
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
                    onClick={() => handleRemovePlayer(player._id!)}
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