import { defineComponent } from "bitecs";
import { Vector2 } from "@/game/types";
import componentMap from ".";

const Position = defineComponent( Vector2 );

componentMap['Position'] = Position;

export default Position;
