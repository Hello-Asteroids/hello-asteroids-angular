import { Scene } from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";

import { IGameScene } from "@/game/types";
import TankControls from "@/game/components/tankControls";
import Velocity from "@/game/components/velocity";
import Rotation from "@/game/components/rotation";

export default function TankControlsSystem<T extends IGameScene>( _scene : T )
{

  const controlQuery = defineQuery( [ TankControls, Velocity, Rotation ] );

  return defineSystem( ( _world : IWorld ) => {

    const { deltaTime, playerInput } = _scene;

    const entities = controlQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const r_delta = playerInput.movement.x * TankControls.rotationSpeed[ entity ] * deltaTime;
      Rotation.value[ entity ] += r_delta;

      const r_offset = 90 * (Math.PI / 180);

      if( playerInput.movement.y > 0 )
      {
        const currentRotation = Rotation.value[ entity ];
        const currentAcceleration = TankControls.acceleration[ entity ];
        const v_x = Math.cos( currentRotation + r_offset ) * currentAcceleration * -1 * deltaTime;
        const v_y = Math.sin( currentRotation + r_offset ) * currentAcceleration * -1 * deltaTime;

        Velocity.acceleration.x[ entity ] += v_x;
        Velocity.acceleration.y[ entity ] += v_y;
      }

    }

    return _world;
  } )
}
