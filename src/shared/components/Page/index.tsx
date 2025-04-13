import { HTMLAttributes } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './styles.scss';
import { cn } from "../../utils";
import { Title } from "../Title";
import { useRouter } from "../../../providers/router/hooks";
import { Logo } from '../../../assets/logo.svg';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  cantGoBack?: boolean;
  withLogo?: boolean;
}

export const Page: React.FC<PageProps> = ({ children, title, cantGoBack, withLogo, ...props }) => {
  const router = useRouter();

  return (
    <div {...props} className={cn(props.className, 'page')}>
      {!cantGoBack && <ArrowBackIcon className="back-button" onClick={router.goBack} />}
      {withLogo && (
        <div className="logo-container">
          <Logo />
        </div>
      )}
      {title && <Title>{title}</Title>}
      {children}
    </div>
  )
};