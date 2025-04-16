import React, { PropsWithChildren, ReactNode, useState } from "react";
import { HeaderContext } from "./context";
import { Header } from "../../layout/Header";

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [title, setTitle] = useState<ReactNode>();

  return (
    <HeaderContext.Provider value={{ canGoBack, setCanGoBack, title, setTitle }}>
      <Header />
      {children}
    </HeaderContext.Provider>
  );
}
