"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { signIn, signOut } from "next-auth/react";
import { 
  FaUsers, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaEnvelope,
  FaSave,
  FaGoogle 
} from "react-icons/fa";
import Link from "next/link";

// Types for our team data
type Player = {
  _id: string;
  name: string;
  number?: number;
};

type Team = {
  _id: string;
  name: string;
  createdAt: Date;
  players: Player[];
};

type ProfileFormData = {
  name: string;
  email: string;
};

export default function Dashboard() {
  const { data: session, status, update: updateSession } = useSession();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is OAuth user
  const isOAuthUser = session?.user?.provider === 'google';

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  // Update profile data when session changes
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any existing messages
    setError(null);
    setSuccessMessage(null);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        // Update session with new data
        await updateSession({
          user: {
            ...session?.user,
            name: profileData.name,
            email: profileData.email,
          }
        });
        
        setSuccessMessage("Profile updated successfully");
        setIsEditingProfile(false);
        
        // Update local state
        setProfileData(prev => ({
          ...prev,
          name: profileData.name,
          email: profileData.email
        }));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to update profile');
    }
  }

  const handleDeleteTeam = async (teamId: string) => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setTeams(currentTeams => currentTeams.filter(team => team._id !== teamId));
        setError(null);
        setSuccessMessage("Team deleted successfully");
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
          Manage your teams and enjoy the game. Let&apos;s organize and have fun!
        </p>
      </section>

      {/* Messages Display */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 text-green-500 p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      {/* Profile Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Profile Settings</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 inline-flex items-center"
          >
            <FaUser className="mr-2" /> {isEditingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED2939]"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#ED2939] text-white font-bold rounded-lg hover:bg-[#C62631] flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-3" />
              <span className="text-gray-700">{profileData.name}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 mr-3" />
              <span className="text-gray-700">{profileData.email}</span>
            </div>
            {isOAuthUser && (
              <div className="flex items-center text-sm text-gray-500">
                <FaGoogle className="mr-3" />
                <span>Signed in with Google</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Team Overview Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Teams
        </h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading teams...</div>
        ) : teams.length === 0 ? (
          <div className="text-center text-gray-600">You haven&apos;t created any teams yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <div key={team._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
                <p className="text-gray-700 mb-4">
                  Players: {team.players.length}
                </p>
                <p className="text-gray-700 mb-4">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2">
                  <Link
                    href={`/teams/edit/${team._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteTeam(team._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 inline-flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
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