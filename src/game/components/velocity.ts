import { defineComponent } from "bitecs";
import { Vector2 } from "@/game/types";

const Velocity = defineComponent( {
  value : Vector2,
  acceleration : Vector2
} );

export default Velocity;
