import { ROUTES } from "../../providers/router/constants";

export type BottomLink = {
  value: keyof typeof ROUTES;
  Icon: React.FC;
}