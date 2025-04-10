import PersonIcon from '@mui/icons-material/Person';

import { BottomLink } from "./types";
import DragonIcon from '../../assets/dragon.svg';
import SwordIcon from '../../assets/sword.svg';

export const BOTTOM_LINKS: BottomLink[] = [
  {
    value: 'masterHome',
    Icon: DragonIcon,

  },
  {
    value: 'playerHome',
    Icon: SwordIcon,
  },
  {
    value: 'profile',
    Icon: PersonIcon,
  }
]