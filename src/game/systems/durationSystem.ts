import { Scene } from "phaser";
import { defineQuery, defineSystem, enterQuery, removeEntity } from "bitecs";
import type { IWorld } from 'bitecs';
import Duration from "@/game/components/duration";

export default function DurationSystem( _scene : Scene )
{

  const durationQuery = defineQuery( [ Duration ] );
  const durationEnterQuery = enterQuery( durationQuery );

  return defineSystem( ( _world : IWorld ) => {

    const { time } = _scene;

    let entities = durationEnterQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      Duration.startTime[ entities[i] ] = time.now;
    }

    entities = durationQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      if( time.now > Duration.startTime[ entity ] + Duration.value[ entity ] )
      {
        removeEntity( _world, entity );
      }
    }

    return _world;
  } )
}
