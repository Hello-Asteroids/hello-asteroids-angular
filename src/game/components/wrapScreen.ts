import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const WrapScreen = defineComponent({
  offset : Types.ui32
});

componentMap['WrapScreen'] = WrapScreen;

export default WrapScreen;
