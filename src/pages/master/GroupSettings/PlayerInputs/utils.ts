import { GroupPlayer } from "../../../../providers/groups/types";

export const getDefaultPlayer = (): GroupPlayer => ({ id: Date.now(), user_id: -1, player_name: '' });