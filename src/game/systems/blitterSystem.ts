import { defineQuery, defineSystem, enterQuery, exitQuery } from "bitecs";
import type { IWorld } from 'bitecs';
import { GameObjects, Scene } from "phaser";
import Blitter from "@/game/components/blitter";
import Position from "@/game/components/position";

const objectMap : Map<number, GameObjects.Bob> = new Map();

export default function BlitterSystem<T extends Scene>( scene : T, blitterObject : GameObjects.Blitter )
{
  objectMap.clear();

  // Queries
  const blitterQuery = defineQuery( [ Blitter, Position ] );
  const blitterEnterQuery = enterQuery( blitterQuery );
  const blitterExitQuery = exitQuery( blitterQuery );

  return defineSystem( ( _world : IWorld ) => {

    let i;
    let currentEntity;

    let entities = blitterEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      currentEntity = entities[i];

      objectMap.set( currentEntity, blitterObject.create( 0, 0, Blitter.frame[currentEntity] ) );
    }

    entities = blitterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      currentEntity = entities[i];
      const blitterObject = objectMap.get( currentEntity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.x = Position.x[ currentEntity ] + ( Blitter.origin.x[ currentEntity ] * -1 );
				blitterObject.y = Position.y[ currentEntity ] + ( Blitter.origin.y[ currentEntity ] * -1 );
      }
    }

    entities = blitterExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      console.log( 'exit query' )
      currentEntity = entities[i];
      const blitterObject = objectMap.get( currentEntity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.destroy();
      }

      objectMap.delete( currentEntity );
    }

    return _world;
  } )
}
