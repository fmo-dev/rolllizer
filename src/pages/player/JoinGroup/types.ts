import { GroupType } from "../../../providers/groups/types";
import { Player } from "../../master/GroupSettings/PlayerInputs/types";

export type GroupToJoin = {
  group: Pick<GroupType, 'id' | 'name'>;
  players: Pick<Player, 'id' | 'player_name' | 'user_id'>[];
};
