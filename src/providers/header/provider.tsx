import React, { PropsWithChildren, useState } from "react";
import { HeaderContext } from "./context";
import { Header } from "../../layout/Header";

export const HeaderContextProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState("");

  return (
    <HeaderContext.Provider value={{ setTitle }}>
      <Header title={title} />
      {children}
    </HeaderContext.Provider>
  );
}
