import { defineQuery, defineSystem, enterQuery, removeEntity } from "bitecs";
import type { IWorld } from "bitecs";
import { createPrefab, IGameScene } from "../types";
import PlayerInput from "../components/playerInput";
import Collision from "../components/collision";
import { playerSpawnerPrefab } from "../prefabs";

export default function PlayerDeathSystem<T extends IGameScene>( _scene : T )
{

  const playerQuery = defineQuery( [ PlayerInput, Collision ] );
  const enterPlayerQuery = enterQuery( playerQuery );

  const { state } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    const entities = enterPlayerQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity( _world, entities[i] );
      state.updateLives( -1 );

      createPrefab( _world, playerSpawnerPrefab );
    }

    return _world;
  } )
}
