import { defineQuery, defineSystem, enterQuery, removeEntity } from "bitecs";
import type { IWorld } from "bitecs";

import { createPrefab, IGameScene } from "@/game/types";
import PlayerSpawner from "@/game/components/playerSpawner";
import Position from "@/game/components/position";
import { playerPrefab } from "@/game/prefabs";

export default function playerSpawnSystem<T extends IGameScene>( scene : T )
{

  const spawnerQuery = defineQuery( [ PlayerSpawner, Position ] );
  const spawnerEnterQuery = enterQuery( spawnerQuery );

  return defineSystem( ( _world : IWorld ) => {

    let i;

    let entities = spawnerEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const position = { x : Position.x[ entity ], y : Position.y[ entity ] };

      removeEntity( _world, entity );

      createPrefab( _world, playerPrefab, { position } );
    }

    return _world;
  } )
}
