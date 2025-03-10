import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from "bitecs";
import type { IWorld } from "bitecs";

import { IGameScene } from "@/game/types";
import PlayerSpawner from "@/game/components/playerSpawner";
import Position from "@/game/components/position";
import { playerPrefab } from "@/game/prefabs";
import { createPrefab } from "@/app/common/utilities";
import Duration from "../components/duration";

export default function playerSpawnSystem<T extends IGameScene>( scene : T )
{

  const spawnerQuery = defineQuery( [ PlayerSpawner, Position, Duration ] );
  const spawnerEnterQuery = enterQuery( spawnerQuery );
  const spawnerExitQuery = exitQuery( spawnerQuery )

  return defineSystem( ( _world : IWorld ) => {

    let i;

    let entities = spawnerExitQuery( _world );
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
