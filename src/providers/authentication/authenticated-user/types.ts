type Profile = 'master' | 'player'

export interface User {
  id: number;
  profile: Profile | null;
}