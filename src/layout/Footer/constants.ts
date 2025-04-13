import DragonIcon from '../../assets/dragon.svg';
import SwordIcon from '../../assets/sword.svg';
import { BottomLink } from './types';

export const BOTTOM_LINKS: Record<"left" | "right", BottomLink> = {
  left: {
    value: 'masterHome',
    Icon: DragonIcon,

  },
  right: {
    value: 'playerHome',
    Icon: SwordIcon,
  },
}