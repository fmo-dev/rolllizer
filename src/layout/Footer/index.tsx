
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useRouter } from '../../providers/router/hooks';
import { useEffect, useState } from 'react';
import { BOTTOM_LINKS } from './constants';
import { ROUTES } from '../../providers/router/constants';
import { cn } from '../../shared/utils';
import "./styles.scss";

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const { navigate } = useRouter();
  const [currentValue, setCurrentValue] = useState<keyof typeof ROUTES>();

  useEffect(() => {
    if (!currentValue) {
      const mainRoute = pathname.split('/')[1];
      const currentLink = BOTTOM_LINKS.find(({ value }) => ROUTES[value]?.path.split('/')[0] === mainRoute);
      setCurrentValue(currentLink?.value);
    }
  }, [currentValue, pathname]);
  return (
    <div className="footer">
      <BottomNavigation
        onChange={(_, newValue) => {
          setCurrentValue(newValue);
          navigate(newValue);
        }}
      >
        {BOTTOM_LINKS.map(({ value, Icon }) => (
          <BottomNavigationAction
            className={cn('navigation-icon', { "is-current": currentValue === value })}

            key={value}
            value={value}
            icon={<Icon />}
          />
        ))}
      </BottomNavigation>
    </div>
  )
}