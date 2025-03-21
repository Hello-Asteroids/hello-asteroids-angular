import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const LifeSpan = defineComponent({
  value : Types.f32
});

componentMap[ 'LifeSpan' ] = LifeSpan;

export default LifeSpan;
