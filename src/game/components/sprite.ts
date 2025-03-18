import { defineComponent } from "bitecs";
import { Renderable } from "@/game/types";
import componentMap from ".";

const Sprite = defineComponent( Renderable );

componentMap['Sprite'] = Sprite;

export default Sprite;
