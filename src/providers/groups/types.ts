export type UserProfile = 'master' | 'player'

export interface UserGroups {
  asOwner: GroupType[];
  asPlayer: GroupType[];
}

export interface GroupType {
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