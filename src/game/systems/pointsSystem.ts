import { defineQuery, defineSystem, exitQuery } from "bitecs";
import type { IWorld } from "bitecs";

import { IGameScene } from "@/game/types";

import WorthPoints from "@/game/components/worthPoints";
import Collision from "@/game/components/collision";

export default function PointsSystem<T extends IGameScene>( _scene : T )
{

  const pointsQuery = defineQuery( [ WorthPoints, Collision ] );
  const pointsExitQuery = exitQuery( pointsQuery );

  const { stateService } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    const entities = pointsExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const points = WorthPoints.value[ entities[i] ];
      stateService.updateScore( points );
    }

    return _world;
  } )
}
