import { defineComponent, Types } from "bitecs";
import { Vector2 } from "@/game/types";
import componentMap from ".";

const PlayerInput = defineComponent({
  movement : Vector2,
  shoot : Types.ui8
});

componentMap['PlayerInput'] = PlayerInput;

export default PlayerInput;
