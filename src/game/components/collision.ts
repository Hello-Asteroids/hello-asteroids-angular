import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Collision = defineComponent( {
  eid : Types.eid
} );

componentMap['Collision'] = Collision;

export default Collision;
