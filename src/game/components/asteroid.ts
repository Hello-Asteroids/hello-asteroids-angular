import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Asteroid = defineComponent({
  tier : Types.ui8
});

componentMap['Asteroid'] = Asteroid;

export default Asteroid;
