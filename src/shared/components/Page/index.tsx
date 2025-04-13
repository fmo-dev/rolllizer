import { HTMLAttributes, useEffect } from "react";

import './styles.scss';
import { cn } from "../../utils";
import { Title } from "../Title";
import { Logo } from '../../../assets/logo.svg';
import { useFooterContext } from "../../../providers/footer/hooks";
import { FooterAction } from "../../../providers/footer/type";
import { useHeaderContext } from "../../../providers/header/hooks";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  cantGoBack?: boolean;
  withLogo?: boolean;
  footerAction?: FooterAction;
}

export const Page: React.FC<PageProps> = ({ children, title, cantGoBack, withLogo,
  footerAction, ...props }) => {
  const { setFooterAction } = useFooterContext();
  const { setCanGoBack } = useHeaderContext();

  useEffect(() => {
    setCanGoBack(!cantGoBack);
  }, [cantGoBack, setCanGoBack])

  useEffect(() => {
    setFooterAction(footerAction);
  }, [footerAction, setFooterAction, title])

  return (
    <div {...props} className={cn(props.className, 'page')}>
      <div className="page-header">

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