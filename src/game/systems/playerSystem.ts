import { defineQuery, defineSystem, exitQuery } from "bitecs";
import type { IWorld } from "bitecs";

import { IGameScene } from "@/game/types";
import { playerDebisPrefab } from "@/game/prefabs";
import { createPrefabBundle } from "@/app/common/utilities";
import { ANIMATIONS } from "@/game/constants";

import Player from "@/game/components/player";
import Position from "@/game/components/position";
import Rotation from "@/game/components/rotation";
import Collision from "@/game/components/collision";
import Velocity from "@/game/components/velocity";
import Animation from "@/game/components/animation";

export default function PlayerSystem<T extends IGameScene>( _scene : T )
{

  const playerQuery = defineQuery( [ Player, Velocity, Animation ] );

  const playerCollisionQuery = defineQuery( [ Player, Position, Rotation, Collision ] );
  const playerCollisionExitQuery = exitQuery( playerCollisionQuery );

  const { stateService: state } = _scene;

  return defineSystem( ( _world : IWorld ) => {


    let entities = playerQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      if( Velocity.acceleration.x[ entity ] !== 0 || Velocity.acceleration.y[ entity ] !== 0 )
      {
        Animation.id[ entity ] = ANIMATIONS.PLAYER_THRUST;
      }
      else
      {
        Animation.id[ entity ] = ANIMATIONS.PLAYER_IDLE;
      }
    }

    entities = playerCollisionExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const config = {
        rotation : Rotation.value[ entity ],
        position : {
          x : Position.x[ entity ],
          y : Position.y[ entity ]
        }
      }

      createPrefabBundle( _world, 3, playerDebisPrefab, config );

      if( playerQuery( _world ).length === 0 )
      {
        state.updateLives( -1 );
      }
    }

    return _world;
  } )
}
