import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const WorthPoints = defineComponent( {
  value : Types.ui32
} );

componentMap['WorthPoints'] = WorthPoints;

export default WorthPoints;
