import { defineComponent, Types } from "bitecs";

const Duration = defineComponent( {
  value : Types.f32,
  startTime : Types.f32
} );

export default Duration;
