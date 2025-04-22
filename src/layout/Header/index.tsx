import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./styles.scss";
import { useRouter } from '../../providers/router/hooks';
import { useHeaderContext } from '../../providers/header/hooks';
import { useAuthentication } from '../../providers/authentication/hooks';
import { useEffect, useState } from 'react';
import { cn } from '../../shared/utils';
import { getBarStyle, getHeaderStyle, getTitleStyle } from './utils';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const { navigate, goBack } = useRouter();
  const { canGoBack, title } = useHeaderContext();
  const { user } = useAuthentication();
  const [barStyle, setBarStyle] = useState(getBarStyle(0));
  const [headerStyle, setHeaderStyle] = useState(getHeaderStyle(0));
  const [titleStyle, setTitleStyle] = useState(getTitleStyle(0));

  const onProfileClick = () => {
    navigate('profile');
  }

  useEffect(() => {
    const abortController = new AbortController();
    document.addEventListener('scroll', () => {
      const scrollPercent = Math.min(document.documentElement.scrollTop / 60, 1);
      setBarStyle(getBarStyle(scrollPercent));
      setHeaderStyle(getHeaderStyle(scrollPercent));
      setTitleStyle(getTitleStyle(scrollPercent));
    }, { signal: abortController.signal });
    return () => {
      abortController.abort();
    };
  }, [])

  if (!user) {
    return null;
  }
  return (
    <div className={cn("app-header")} style={headerStyle} >
      <div className="header-bar" style={barStyle}></div>
      <div className="back-button-container">
        {canGoBack && <ArrowBackIcon className="back-button" onClick={goBack} />}
      </div>
      {title && <div className="app-header-title" style={titleStyle}>{title}</div>}
      <div className='app-header-icons'>
        <PersonIcon className="app-header-icons-icon" onClick={onProfileClick} />
      </div>
    </div>
  )
}