import { defineQuery, defineSystem, exitQuery, IWorld } from "bitecs";
import { IGameScene } from "../types";
import WorthPoints from "../components/worthPoints";
import Collision from "../components/collision";

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
