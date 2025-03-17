import { defineComponent, Types } from "bitecs";

const Weapon = defineComponent( {
  lastFired : Types.f32,

  rate : Types.f32,
  range : Types.f32,
  projectileSpeed : Types.f32,
  projectileCount : Types.ui8,
  spread : Types.ui16
} );

export default Weapon;
