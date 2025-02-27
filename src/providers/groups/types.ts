export type UserProfile = 'master' | 'player'

export interface Group {
  id: number;
  name: string;
  ownerId: number;
  imageUrl: string;
}

export interface GroupPlayer {
  id: number;
  userId: number;
  playerName: string;
}