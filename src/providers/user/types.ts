export type UserProfile = 'master' | 'player'

export interface User {
  id: number;
  profile: UserProfile | null;
}