import { HTMLAttributes } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './styles.scss';
import { cn } from "../../utils";
import { Title } from "../Title";
import { useRouter } from "../../../providers/router/hooks";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  cantGoBack?: boolean;
}


export const Page: React.FC<PageProps> = ({ children, title, cantGoBack, ...props }) => {
  const router = useRouter();

  return (
    <div {...props} className={cn(props.className, 'page')}>
      {!cantGoBack && <ArrowBackIcon className="back-button" onClick={router.goBack} />}
      {title && <Title>{title}</Title>}
      {children}
    </div>
  )
};