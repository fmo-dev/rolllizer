import React, { PropsWithChildren, useCallback, useState } from "react";
import { ToastContext } from "./context";
import { Snackbar } from "@mui/material";

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addToast = useCallback((message: string) => {
    setToastMessage(message);
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!toastMessage}
        onClose={() => setToastMessage(null)}
        autoHideDuration={3000}
        message={toastMessage}
      />
    </ToastContext.Provider>
  );
}
