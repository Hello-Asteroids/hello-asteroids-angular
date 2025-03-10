import { defineQuery, defineSystem, exitQuery, IWorld } from "bitecs";
import { IGameScene } from "../types";
import Asteroid from "../components/asteroid";
import Collision from "../components/collision";
import { asteroidPrefab } from "../prefabs";
import { asteroidConfigs } from "../constants";
import Position from "../components/position";
import { createPrefabBundle } from "@/app/common/utilities";

export default function AsteroidSystem<T extends IGameScene>( _scene : T )
{

  const asteroidQuery = defineQuery( [ Asteroid ] );
  const asteroidExitQuery = exitQuery( asteroidQuery );

  const hitAsteroidQuery = defineQuery( [ Asteroid, Position, Collision ] );
  const hitAsteroidExitQuery = exitQuery( hitAsteroidQuery );

  const { stateService } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    let entities = hitAsteroidExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      stateService.updateScore( Asteroid.points[ entity ] );

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
