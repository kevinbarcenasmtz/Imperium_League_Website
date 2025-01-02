import mongoose from 'mongoose';

// Player Schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    default: null
  },
  position: {
    type: String,
    default: null
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  }
}, { timestamps: true });

// Team Schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, { timestamps: true });

export const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);