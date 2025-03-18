import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Weapon = defineComponent( {
  lastFired : Types.f32,

  rate : Types.f32,
  range : Types.f32,
  projectileSpeed : Types.f32,
  projectileCount : Types.ui8,
  spread : Types.ui16,
  deviation : Types.f32
} );

componentMap['Weapon'] = Weapon;

export default Weapon;
