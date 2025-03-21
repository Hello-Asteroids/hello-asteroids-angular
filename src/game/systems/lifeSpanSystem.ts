import { addComponent, defineQuery, defineSystem, enterQuery, exitQuery, hasComponent, IWorld, removeEntity } from "bitecs";
import { Scene } from "phaser";
import LifeSpan from "../components/lifespan";
import Duration from "../components/duration";

export default function LifeSpanSystem( _scene : Scene )
{
  const lifeSpanEnterQuery = enterQuery( defineQuery( [ LifeSpan ] ) );
  const lifeSpanExitQuery = exitQuery( defineQuery( [ LifeSpan, Duration ] ) );

  return defineSystem( ( _world : IWorld ) => {

    let entities = lifeSpanEnterQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      if( !hasComponent( _world, Duration, entity ) )
      {
        addComponent( _world, Duration, entity );
      }

      Duration.value[ entity ] = LifeSpan.value[ entity ];
    }

    entities = lifeSpanExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];

      removeEntity( _world, entity );
    }

    return _world;
  } )
}
