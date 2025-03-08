import { defineComponent, Types } from "bitecs";

const Weapon = defineComponent( {
  fireRate : Types.f32,
  lastFired : Types.f32,
  projectileSpeed : Types.f32
} );

export default Weapon;
