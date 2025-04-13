import PersonIcon from '@mui/icons-material/Person';

import "./styles.scss";
import { useRouter } from '../../providers/router/hooks';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { navigate } = useRouter();

  const onProfileClick = () => {
    navigate('profile');
  }

  return (
    <div className="app-header">
      <PersonIcon onClick={onProfileClick} />
    </div>
  )
}