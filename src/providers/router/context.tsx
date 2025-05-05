import { createContext } from "react";
import { NavigateFn } from "./types";
import { UserProfile } from "../user/types";

interface RouterContextState {
  navigate: NavigateFn;
  goBack(): Promise<void> | void;
  goHome(profile: UserProfile | null): ReturnType<NavigateFn>;
  setHomePath(path: UserProfile | null): void;
}

export const RouterContext = createContext({} as RouterContextState);

