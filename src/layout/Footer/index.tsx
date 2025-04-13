
import { useLocation } from 'react-router-dom';
import { useRouter } from '../../providers/router/hooks';
import { useEffect, useState } from 'react';
import { BOTTOM_LINKS } from './constants';
import { ROUTES } from '../../providers/router/constants';
import { cn } from '../../shared/utils';
import "./styles.scss";
import _find from 'lodash/find';
import { useFooterContext } from '../../providers/footer/hooks';
import { AppButton } from '../../shared/components/Button';
import { useAuthentication } from '../../providers/authentication/hooks';

export const Footer: React.FC = () => {
  const { user } = useAuthentication();
  const { pathname } = useLocation();
  const { navigate } = useRouter();
  const { footerAction } = useFooterContext();
  const [currentValue, setCurrentValue] = useState<keyof typeof ROUTES>();

  useEffect(() => {
    if (!currentValue) {
      const mainRoute = pathname.split('/')[1];
      const currentLink = _find(BOTTOM_LINKS, ({ value }) => ROUTES[value]?.path.split('/')[0] === mainRoute);
      setCurrentValue(currentLink?.value);
    }
  }, [currentValue, pathname]);

  const getIcon = (position: keyof typeof BOTTOM_LINKS) => {
    const { Icon, value } = BOTTOM_LINKS[position];
    return (
      <div className={cn("footer-actions-action", position)}>
        <div
          className={cn("footer-actions-action-icon", position, { "is-current": currentValue === value })}
          onClick={() => {
            setCurrentValue(value);
            navigate(value);
          }}
        >
          <Icon />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("footer", { "without-icons": !user })}>
      <div className="footer-main-button">
        <div className="footer-main-button-container">
          {footerAction && (
            <AppButton
              size="small"
              disabled={footerAction.disabled}
              onClick={footerAction.onClick}
              loading={footerAction.loading}
            >
              {footerAction.icon}
            </AppButton>
          )}

        </div>
      </div>
      <div className='footer-actions'>
        {getIcon('left')}
        {getIcon('right')}
      </div>
      <div className='footer-bottom-bar' />
    </div>
  )
}
