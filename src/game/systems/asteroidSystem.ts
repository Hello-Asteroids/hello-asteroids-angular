import { defineQuery, defineSystem, exitQuery, IWorld } from "bitecs";

import { createPrefab, createPrefabBundle } from "@/app/common/utilities";

import { IGameScene } from "@/game/types";
import { asteroidPrefab, explosionPrefab } from "@/game/prefabs";
import { asteroidConfigs } from "@/game/constants";

import Asteroid from "@/game/components/asteroid";
import Collision from "@/game/components/collision";
import Position from "@/game/components/position";

export default function AsteroidSystem<T extends IGameScene>( _scene : T )
{

  const asteroidQuery = defineQuery( [ Asteroid ] );

  const hitAsteroidQuery = defineQuery( [ Asteroid, Position, Collision ] );
  const hitAsteroidExitQuery = exitQuery( hitAsteroidQuery );

  const { stateService } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    let entities = hitAsteroidExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      createPrefab( _world, explosionPrefab, { position : {
        x : Position.x[ entity ],
        y : Position.y[ entity ]
      } } );

      if( Asteroid.tier[ entity ] > 0 )
      {

        const config =  {
          ...asteroidConfigs[ Asteroid.tier[ entity ] - 1 ],
          position : {
            x : Position.x[ entity ],
            y : Position.y[ entity ]
          }
        };

        createPrefabBundle( _world, 2, asteroidPrefab, config );
      }

      if( asteroidQuery( _world ).length === 0 )
      {
        stateService.incrementLevel( 2500 );
      }
    }

    return _world;
  } )
}
