import { defineComponent, Types } from "bitecs";
import { Vector2 } from "@/game/types";
import componentMap from ".";

const Velocity = defineComponent( {
  value : Vector2,
  max : Types.f64,
  acceleration : Vector2
} );

componentMap['Velocity'] = Velocity;

export default Velocity;
