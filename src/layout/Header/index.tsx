import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./styles.scss";
import { useRouter } from '../../providers/router/hooks';
import { useHeaderContext } from '../../providers/header/hooks';
import { useAuthentication } from '../../providers/authentication/hooks';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const { navigate, goBack } = useRouter();
  const { canGoBack } = useHeaderContext();
  const { user } = useAuthentication();

  const onProfileClick = () => {
    navigate('profile');
  }

  return (
    <div className="app-header">
      {!!user && (
        <>
          <div className="back-button-container">
            {canGoBack && <ArrowBackIcon className="back-button" onClick={goBack} />}
          </div>
          <div className='app-header-icons'>
            <PersonIcon className="app-header-icons-icon" onClick={onProfileClick} />
          </div>
        </>
      )}
    </div>
  )
}