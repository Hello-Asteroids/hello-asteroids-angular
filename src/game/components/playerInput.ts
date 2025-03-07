import { defineComponent, Types } from "bitecs";
import { Vector2 } from "@/game/types";

const PlayerInput = defineComponent({
  movement : Vector2,
  shoot : Types.ui8
});

export default PlayerInput;
