'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// team registration form from claude
export default function TeamRegistrationForm() {
  const [teamData, setTeamData] = useState({
    name: '',
    players: [{ name: '', number: '', position: '' }]
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const addPlayer = () => {
    setTeamData({
      ...teamData,
      players: [...teamData.players, { name: '', number: '', position: '' }]
    })
  }

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const newPlayers = [...teamData.players]
    newPlayers[index] = { ...newPlayers[index], [field]: value }
    setTeamData({ ...teamData, players: newPlayers })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
      })

      if (res.ok) {
        router.push('/dashboard')
      } else {
        const data = await res.json()
        setError(data.message)
      }
    } catch (error) {
      setError('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
          Team Name
        </label>
        <input
          type="text"
          id="teamName"
          value={teamData.name}
          onChange={(e) => setTeamData({...teamData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Players</h3>
        {teamData.players.map((player, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Player Name"
              value={player.name}
              onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="number"
              placeholder="Number"
              value={player.number}
              onChange={(e) => handlePlayerChange(index, 'number', e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Position"
              value={player.position}
              onChange={(e) => handlePlayerChange(index, 'position', e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPlayer}
          className="text-blue-500 hover:text-blue-600"
        >
          + Add Player
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        Register Team
      </button>
    </form>
  )
}