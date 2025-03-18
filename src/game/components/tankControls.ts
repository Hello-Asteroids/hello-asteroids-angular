import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const TankControls = defineComponent( {
  acceleration: Types.f32,
	rotationSpeed: Types.f32,
	rotationOffset: Types.f32,
} );

componentMap['TankControls'] = TankControls;

export default TankControls;
