import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Animation = defineComponent( {
  id : Types.ui8
} );

componentMap['Animation'] = Animation;

export default Animation;
