import { HTMLAttributes, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './styles.scss';
import { cn } from "../../utils";
import { Title } from "../Title";
import { useRouter } from "../../../providers/router/hooks";
import { Logo } from '../../../assets/logo.svg';
import { useFooterContext } from "../../../providers/footer/hooks";
import { FooterAction } from "../../../providers/footer/type";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  cantGoBack?: boolean;
  withLogo?: boolean;
  footerAction?: FooterAction;
}

export const Page: React.FC<PageProps> = ({ children, title, cantGoBack, withLogo,
  footerAction, ...props }) => {
  const router = useRouter();
  const { setFooterAction } = useFooterContext();

  useEffect(() => {
    setFooterAction(footerAction);
  }, [footerAction, setFooterAction, title])

  return (
    <div {...props} className={cn(props.className, 'page')}>
      <div className="page-header">
        <div className="back-button-container">
          {!cantGoBack && <ArrowBackIcon className="back-button" onClick={router.goBack} />}
        </div>
        {withLogo && (
          <div className="logo-container">
            <Logo />
          </div>
        )}
        <div className="title-container">
          {title && <Title>{title}</Title>}
        </div>
      </div>
      {children}
    </div>
  )
};