import React, { PropsWithChildren, useState } from "react";
import { HeaderContext } from "./context";
import { Header } from "../../layout/Header";

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <HeaderContext.Provider value={{ canGoBack, setCanGoBack }}>
      <Header />
      {children}
    </HeaderContext.Provider>
  );
}
