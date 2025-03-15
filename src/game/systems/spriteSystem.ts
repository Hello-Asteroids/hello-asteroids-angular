import { GameObjects, Scene } from "phaser";
import { defineQuery, defineSystem, enterQuery, exitQuery, Not } from "bitecs";
import type { IWorld } from 'bitecs';

import Position from "@/game/components/position";
import Rotation from "@/game/components/rotation";
import Sprite from "@/game/components/sprite";

export const displayObjectMap : Map<number, GameObjects.Bob | GameObjects.Sprite> = new Map();

export default function SpriteSystem( _scene : Scene, _blitterObject : GameObjects.Blitter )
{
  displayObjectMap.clear();

  // Queries
  // Blitters will be used where no Rotation is needed
  const blitterQuery = defineQuery( [ Sprite, Position, Not(Rotation), Not(Animation) ] );
  const blitterEnterQuery = enterQuery( blitterQuery );
  const blitterExitQuery = exitQuery( blitterQuery );

  // Sprites will be used only when Rotation is needed
  const spriteQuery = defineQuery( [ Sprite, Position, Rotation ] );
  const spriteEnterQuery = enterQuery( spriteQuery );
  const spriteExitQuery = exitQuery( spriteQuery );

  return defineSystem( ( _world : IWorld ) => {

    let i;
    let entity;

    let entities = blitterEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      entity = entities[i];
      displayObjectMap.set( entity, _blitterObject.create( 0, 0, Sprite.frame[entity] ) );
    }

    entities = blitterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      entity = entities[i];
      const blitterObject = displayObjectMap.get( entity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.x = Position.x[ entity ] + ( Sprite.origin.x[ entity ] * -1 );
				blitterObject.y = Position.y[ entity ] + ( Sprite.origin.y[ entity ] * -1 );
      }
    }

    entities = blitterExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      console.log( 'exit query' )
      entity = entities[i];
      const blitterObject = displayObjectMap.get( entity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.destroy();
      }

      displayObjectMap.delete( entity );
    }

    entities = spriteEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      entity = entities[i];
      const spriteObject = _scene.add.sprite( 0, 0, 'asteroids' );
      spriteObject.setFrame( Sprite.frame[ entity ] );
      displayObjectMap.set( entity, spriteObject );
    }

    entities = spriteQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      entity = entities[i];
      const spriteObject = displayObjectMap.get( entity ) as GameObjects.Sprite;

      if( spriteObject )
      {
        spriteObject.x = Position.x[ entity ] + ( Sprite.origin.x[ entity ] * -1 );
        spriteObject.y = Position.y[ entity ] + ( Sprite.origin.y[ entity ] * -1 )
        spriteObject.rotation = Rotation.value[ entity ];
      }
    }

    entities = spriteExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      entity = entities[i];
      const spriteObject = displayObjectMap.get( entity ) as GameObjects.Sprite;

      if( spriteObject )
      {
        spriteObject.destroy();
      }

      displayObjectMap.delete( entity );
    }

    return _world;
  } )
}
