import { defineComponent, Types } from "bitecs";

const Asteroid = defineComponent({
  tier : Types.ui8,
  points : Types.ui32
});

export default Asteroid;
