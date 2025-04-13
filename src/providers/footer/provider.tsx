import React, { memo, PropsWithChildren, useState } from "react";
import { FooterContext } from "./context";
import { Footer } from "../../layout/Footer";
import { FooterAction } from "./type";

export const FooterContextProvider = memo(({ children }: PropsWithChildren) => {
  const [footerAction, setFooterAction] = useState<FooterAction>();

  return (
    <FooterContext.Provider value={{
      footerAction,
      setFooterAction
    }}>
      {children}
      <Footer />
    </FooterContext.Provider>
  );
});
