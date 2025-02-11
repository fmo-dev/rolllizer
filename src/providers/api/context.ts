import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

type APIContextState = SupabaseClient;

export const APIContext = createContext({} as APIContextState);