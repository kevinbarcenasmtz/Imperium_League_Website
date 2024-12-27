"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import prisma from "../../../prisma"; // assuming you have a Prisma client file

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState("");
  const router = useRouter();

  // Check if session is loading
  if (status === "loading") {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  // Redirect to login if there's no session
  if (!session || !session.user) {
    router.push("/login");
    return null;
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await prisma.team.create({
        data: {
          name: teamName,
          userId: session.user.id, // Link team to logged-in user
        },
      });
      router.push("/teams"); // Navigate to teams page (or show success)
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Error creating team.");
    }
  };

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <form onSubmit={handleCreateTeam}>
        <label>Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
}
