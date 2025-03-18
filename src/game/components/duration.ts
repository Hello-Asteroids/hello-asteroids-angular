import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Duration = defineComponent( {
  value : Types.f32,
  startTime : Types.f32
} );

componentMap['Duration'] = Duration;

export default Duration;
