import { defineQuery, defineSystem, enterQuery, exitQuery, IWorld } from "bitecs";

import { createPrefab, createPrefabBundle } from "@/app/common/utilities";

import { IGameScene } from "@/game/types";
import { asteroidPrefab, explosionPrefab } from "@/game/prefabs";
import { ASTEROID_SPRITE_CONFIGS } from "@/game/constants";

import Asteroid from "@/game/components/asteroid";
import Collision from "@/game/components/collision";
import Position from "@/game/components/position";
import Velocity from "../components/velocity";
import WorthPoints from "../components/worthPoints";

export default function AsteroidSystem<T extends IGameScene>( _scene : T )
{

  const asteroidQuery = defineQuery( [ Asteroid, Velocity, WorthPoints ] );
  const asteroidEnterQuery = enterQuery( asteroidQuery );

  const hitAsteroidQuery = defineQuery( [ Asteroid, Position, Collision ] );
  const hitAsteroidExitQuery = exitQuery( hitAsteroidQuery );

  const { stateService } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    const { spawnCount, minSpeed, maxSpeed } = stateService.gameConfig.asteroidStats;

    let entities = asteroidEnterQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      const { lgPointValue, mdPointValue, smPointValue } = stateService.gameConfig.asteroidStats;
      const pointValues = [ smPointValue, mdPointValue, lgPointValue ]

      const angle = Math.random() * 2 * Math.PI;
      const speed = minSpeed.value + ( Math.random() * ( maxSpeed.value - minSpeed.value ) );

      Velocity.value.x[ entity ] = Math.cos( angle ) * speed;
      Velocity.value.y[ entity ] = Math.sin( angle ) * speed;

      WorthPoints.value[ entity ] = pointValues[ Asteroid.tier[ entity ] ].value;
    }

    entities = hitAsteroidExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      createPrefab( _world, explosionPrefab, { position : {
        x : Position.x[ entity ],
        y : Position.y[ entity ]
      } } );

      if( Asteroid.tier[ entity ] > 0 )
      {

        const newTier = Asteroid.tier[ entity ] - 1;

        const config =  {
          tier : newTier,
          display : ASTEROID_SPRITE_CONFIGS[ newTier ],
          position : {
            x : Position.x[ entity ],
            y : Position.y[ entity ]
          }
        };

        createPrefabBundle( _world, spawnCount.value, asteroidPrefab, config );
      }

      if( asteroidQuery( _world ).length === 0 )
      {
        stateService.incrementLevel( 2500 );
      }
    }

    return _world;
  } )
}
