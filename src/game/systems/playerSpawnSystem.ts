import { defineQuery, defineSystem, exitQuery } from "bitecs";
import type { IWorld } from "bitecs";

import { createPrefab } from "@/app/common/utilities";

import { IGameScene } from "@/game/types";
import { playerPrefab, playerSpawnerPrefab } from "@/game/prefabs";

import PlayerSpawner from "@/game/components/playerSpawner";
import Position from "@/game/components/position";
import Duration from "@/game/components/duration";
import Collision from "@/game/components/collision";

export default function playerSpawnSystem<T extends IGameScene>( _scene : T )
{

  const spawnerQuery = defineQuery( [ PlayerSpawner, Position, Duration ] );
  const spawnerExitQuery = exitQuery( spawnerQuery );

  return defineSystem( ( _world : IWorld ) => {

    const { stateService, worldService } = _scene;

    let i;

    let entities = spawnerExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      // If collision doesn't exist - spawn, otherwise reinitialize spawner
      if( !Collision.eid[ entity ] )
      {
        const position = { x : Position.x[ entity ], y : Position.y[ entity ] };

        createPrefab( _world, playerPrefab, { position, playerStats : stateService.playerStats } );
      }
      else
      {
        createPrefab( _world, playerSpawnerPrefab );
      }
    }

    return _world;
  } )
}
