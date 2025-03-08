import { defineComponent, Types } from "bitecs";

const RadialCollider = defineComponent( {
  radius : Types.f32,
  layer : Types.ui8,
  mask : [ Types.ui8, 4 ]
} );

export default RadialCollider;
