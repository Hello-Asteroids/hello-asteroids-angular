import { defineQuery, defineSystem, exitQuery, IWorld } from "bitecs";
import { IGameScene } from "../types";
import Player from "../components/player";
import { playerDebisPrefab } from "../prefabs";
import Position from "../components/position";
import Rotation from "../components/rotation";
import Collision from "../components/collision";
import { createPrefab, createPrefabBundle } from "@/app/common/utilities";

export default function PlayerSystem<T extends IGameScene>( _scene : T )
{

  const playerQuery = defineQuery( [ Player, Position, Rotation, Collision ] );
  const playerExitQuery = exitQuery( playerQuery );

  const { stateService: state } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    let entities = playerExitQuery( _world );
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
