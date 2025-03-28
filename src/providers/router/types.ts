
import { ROUTES } from "./constants";

type PathToParams<T extends string> = (T extends `${string}:${1 | 2 | 3 | 4}${infer U}`
  ? [string | number, ...PathToParams<U>]
  : []);


export type NavigateFn = <
  K extends keyof typeof ROUTES,
  P extends typeof ROUTES[K]['path']
>(
  path: K,
  ...param: PathToParams<P>
) => void;

