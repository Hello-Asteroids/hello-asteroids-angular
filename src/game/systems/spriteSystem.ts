import { defineQuery, defineSystem, enterQuery, exitQuery, Not } from "bitecs";
import type { IWorld } from 'bitecs';
import { GameObjects, Scene } from "phaser";
import Position from "@/game/components/position";
import Rotation from "../components/rotation";
import Sprite from "../components/sprite";

export const displayObjectMap : Map<number, GameObjects.Bob | GameObjects.Sprite> = new Map();

export default function SpriteSystem( _scene : Scene, _blitterObject : GameObjects.Blitter )
{
  displayObjectMap.clear();

  // Queries
  // Blitters will be used where no Rotation is needed
  const blitterQuery = defineQuery( [ Sprite, Position, Not(Rotation) ] );
  const blitterEnterQuery = enterQuery( blitterQuery );
  const blitterExitQuery = exitQuery( blitterQuery );

  // Sprites will be used only when Rotation is needed
  const spriteQuery = defineQuery( [ Sprite, Position, Rotation ] );
  const spriteEnterQuery = enterQuery( spriteQuery );
  const spriteExitQuery = exitQuery( spriteQuery );

  return defineSystem( ( _world : IWorld ) => {

    let i;
    let currentEntity;

    let entities = blitterEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      currentEntity = entities[i];
      displayObjectMap.set( currentEntity, _blitterObject.create( 0, 0, Sprite.frame[currentEntity] ) );
    }

    entities = blitterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      currentEntity = entities[i];
      const blitterObject = displayObjectMap.get( currentEntity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.x = Position.x[ currentEntity ] + ( Sprite.origin.x[ currentEntity ] * -1 );
				blitterObject.y = Position.y[ currentEntity ] + ( Sprite.origin.y[ currentEntity ] * -1 );
      }
    }

    entities = blitterExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      console.log( 'exit query' )
      currentEntity = entities[i];
      const blitterObject = displayObjectMap.get( currentEntity ) as GameObjects.Bob;

      if( blitterObject )
      {
        blitterObject.destroy();
      }

      displayObjectMap.delete( currentEntity );
    }

    entities = spriteEnterQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const spriteObject = _scene.add.sprite( 0, 0, 'asteroids' );
      spriteObject.setFrame( Sprite.frame[ entity ] );
      displayObjectMap.set( entity, spriteObject );
    }

    entities = spriteQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const spriteObject = displayObjectMap.get( entity ) as GameObjects.Sprite;

      if( spriteObject )
      {
        spriteObject.x = Position.x[ entity ];
        spriteObject.y = Position.y[ entity ];
        spriteObject.rotation = Rotation.value[ entity ];
      }
    }

    entities = spriteExitQuery( _world );
    for( i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
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
