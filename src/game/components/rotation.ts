import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Rotation = defineComponent( {
  value : Types.f32
} );

componentMap['Rotation'] = Rotation;

export default Rotation;
