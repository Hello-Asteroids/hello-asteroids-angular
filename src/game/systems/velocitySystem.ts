import { defineQuery, defineSystem, IWorld } from "bitecs";

import Velocity from "@/game/components/velocity";
import Position from "@/game/components/position";
import { IGameScene } from "@/game/types";

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

      // Zero acceleration
      Velocity.acceleration.x[ entity ] = 0;
      Velocity.acceleration.y[ entity ] = 0;

      // Apply Velocity to Position at delta
      Position.x[ entity ] += Velocity.value.x[ entity ] * deltaTime;
      Position.y[ entity ] += Velocity.value.y[ entity ] * deltaTime;
    }

    return _world;
  } )
}
