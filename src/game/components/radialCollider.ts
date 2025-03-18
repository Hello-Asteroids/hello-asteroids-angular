import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const RadialCollider = defineComponent( {
  radius : Types.f32,
  layer : Types.ui8,
  mask : [ Types.ui8, 4 ]
} );

componentMap['RadialCollider'] = RadialCollider;

export default RadialCollider;
