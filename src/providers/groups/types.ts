export type UserProfile = 'master' | 'player'

export interface UserGroups {
  asOwner: GroupType[];
  asPlayer: GroupType[];
}

export interface GroupType {
  id: number;
  name: string;
  owner_id: number;
  image_url: string;
  player: GroupPlayer[];
}

export interface GroupPlayer {
  id: number;
  user_id: number;
  player_name: string;
}
