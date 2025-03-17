import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";

import Velocity from "@/game/components/velocity";
import Position from "@/game/components/position";
import { IGameScene } from "@/game/types";
import { clampVector } from "@/game/utilities";

export default function VelocitySystem<T extends IGameScene>( scene : T )
{
  const velocityQuery = defineQuery( [ Velocity, Position ] );

  return defineSystem( ( _world : IWorld ) => {

    const { deltaTime } = scene;

    const entities = velocityQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      // Zero velocity at small increments
      Velocity.value.x[ entity ] = Math.abs( Velocity.value.x[ entity ] ) < 0.01 ? 0 : Velocity.value.x[ entity ]
      Velocity.value.y[ entity ] = Math.abs( Velocity.value.y[ entity ] ) < 0.01 ? 0 : Velocity.value.y[ entity ]

      // Apply frame delta acceleration
      Velocity.value.x[ entity ] += Velocity.acceleration.x[ entity ] * deltaTime;
      Velocity.value.y[ entity ] += Velocity.acceleration.y[ entity ] * deltaTime;

      // Zero out acceleration
      Velocity.acceleration.x[ entity ] = 0;
      Velocity.acceleration.y[ entity ] = 0;

      // Cap Velocity | if 0 assume 'unset', and thus don't cap it
      if( Velocity.max[ entity ] > 0 )
      {
        const clampedVelocity = clampVector( { x : Velocity.value.x[ entity ], y : Velocity.value.y[ entity ] }, Velocity.max[ entity ] );
        Velocity.value.x[ entity ] = clampedVelocity.x;
        Velocity.value.y[ entity ] = clampedVelocity.y;
      }

      // Apply Velocity to Position at deltaTime
      Position.x[ entity ] += Velocity.value.x[ entity ] * deltaTime;
      Position.y[ entity ] += Velocity.value.y[ entity ] * deltaTime;
    }

    return _world;
  } )
}
