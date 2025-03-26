/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from "./constants";

export type NavigateFn = <K extends keyof typeof ROUTES, P extends typeof ROUTES[K]['path']>(
  path: K,
  param?: P extends (...args: any) => any ? Parameters<P> : []
) => void;
