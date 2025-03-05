import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";

import WrapScreen from "@/game/components/wrapScreen";
import Position from "@/game/components/position";
import { Scene } from "phaser";

export default function WrapScreenSystem<T extends Scene>( scene : T )
{
  const wrapScreenQuery = defineQuery( [ WrapScreen, Position ] );

  return defineSystem( ( _world : IWorld ) => {

    const entities = wrapScreenQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      const offset = WrapScreen.offset[ entity ];

      // If right bounds equates to 0, Camera object isn't done loading, so we should skip. Not sure a better way to handle this
      if( scene.cameras.main.worldView.right === 0 )
        continue;

			const bounds = {
				top : 0 - offset,
				right : scene.cameras.main.worldView.right + offset,
				bottom : scene.cameras.main.worldView.bottom + offset,
				left : 0 - offset
			}

			if( Position.x[ entity ] < bounds.left )
			{
				Position.x[ entity ] = bounds.right;
			}
			else if( Position.x[ entity ] > bounds.right )
			{
				Position.x[ entity ] = bounds.left;
			}

			if( Position.y[ entity ] < bounds.top )
			{
				Position.y[ entity ] = bounds.bottom;
			}
			else if( Position.y[ entity ] > bounds.bottom )
			{
				Position.y[ entity ] = bounds.top;
			}
    }

    return _world;
  } )
}
