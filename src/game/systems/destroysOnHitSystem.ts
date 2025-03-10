import { defineQuery, defineSystem, enterQuery, removeEntity } from "bitecs";
import type { IWorld } from "bitecs";
import { IGameScene } from "@/game/types";
import Collision from "@/game/components/collision";
import DestroysOnHit from "@/game/components/destroysOnHit";

export default function DestroysOnHitSystem<T extends IGameScene>( _scene : T )
{

  const diesOnHitQuery = defineQuery( [ DestroysOnHit, Collision ] );
  const enterasteroidsQuery = enterQuery( diesOnHitQuery );

  return defineSystem( ( _world : IWorld ) => {

    const entities = enterasteroidsQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity( _world, entities[i] );
    }

    return _world;
  } )
}
