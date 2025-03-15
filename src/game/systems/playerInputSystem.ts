import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from 'bitecs';

import { IGameScene } from "@/game/types";
import PlayerInput from "@/game/components/playerInput";

export default function PlayerInputSystem<T extends IGameScene>( _scene : T )
{
  const inputQuery = defineQuery( [ PlayerInput ] );

  return defineSystem( ( _world : IWorld ) => {

    const currentInput = _scene.inputService;
    const entities = inputQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      PlayerInput.shoot[entity] = currentInput.shoot;
      PlayerInput.movement.x[entity] = currentInput.movement.x;
      PlayerInput.movement.y[entity] = currentInput.movement.y;
    }

    return _world;
  } )
}
