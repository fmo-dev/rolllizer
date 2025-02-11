import React, { PropsWithChildren, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { APIContext } from "./context";


export const APIProvider = ({ children }: PropsWithChildren) => {
  const api = useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    return createClient(supabaseUrl, supabaseAnonKey)
  }, [])

  return (
    <APIContext.Provider value={api}>
      {children}
    </APIContext.Provider>
  );
}
