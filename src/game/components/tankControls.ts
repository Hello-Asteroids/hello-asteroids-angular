import { defineComponent, Types } from "bitecs";

const TankControls = defineComponent( {
  acceleration: Types.f32,
	rotationSpeed: Types.f32,
	rotationOffset: Types.f32,
} );

export default TankControls;
