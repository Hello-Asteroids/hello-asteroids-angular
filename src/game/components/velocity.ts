import { defineComponent, Types } from "bitecs";
import { Vector2 } from "@/game/types";

const Velocity = defineComponent( {
  value : Vector2,
  max : Types.f64,
  acceleration : Vector2
} );

export default Velocity;
