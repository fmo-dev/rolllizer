import CasinoIcon from '@mui/icons-material/Casino';
import PersonIcon from '@mui/icons-material/Person';

import { BottomLink } from "./types";
import DragonIcon from '../../assets/dragon.svg';

export const BOTTOM_LINKS: BottomLink[] = [
  {
    value: 'masterHome',
    Icon: DragonIcon,

  },
  {
    value: 'playerHome',
    Icon: CasinoIcon,
  },
  {
    value: 'profile',
    Icon: PersonIcon,
  }
]