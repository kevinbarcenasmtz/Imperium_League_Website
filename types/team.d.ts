export interface Player {
  _id: string;
  name: string;
  number: number;
  teamId: string;
}

export interface Team {
  _id: string;
  name: string;
  userId: string;
  players: Player[];
  createdAt: Date;
  updatedAt: Date;
}