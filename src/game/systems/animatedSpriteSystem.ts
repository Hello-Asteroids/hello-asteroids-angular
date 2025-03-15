import { Changed, defineQuery, defineSystem, enterQuery } from "bitecs";
import type { IWorld } from 'bitecs';
import { GameObjects, Scene } from "phaser";

import { IGameScene } from "@/game/types";
import { spriteAnimations } from "@/game/constants";
import Sprite from "@/game/components/sprite";
import Animation from "@/game/components/animation";

import { displayObjectMap } from "./spriteSystem";

export default function AnimatedSpriteSystem<T extends Scene & IGameScene>( _scene : T )
{

  const animationQuery = defineQuery( [ Sprite, Changed( Animation ) ] );
  const animationEnterQuery = enterQuery( animationQuery );

  for( let i = 0; i < spriteAnimations.length; i++ )
  {
    const { key, frames, frameRate, repeat } = spriteAnimations[i];

    _scene.anims.create( {
      key,
      frames : _scene.anims.generateFrameNumbers( 'asteroids', { start : frames.start, end : frames.end } ),
      frameRate,
      repeat
    } );
  }

  return defineSystem( ( _world : IWorld ) => {

    let entities = [ ...animationEnterQuery( _world ), ...animationQuery( _world ) ];
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const animationConfig = spriteAnimations[ Animation.id[ entity ] ];

      const sprite : GameObjects.Sprite = displayObjectMap.get( entity ) as GameObjects.Sprite;

      if( sprite )
      {
        sprite.play( animationConfig.key );
      }
    }

    return _world;
  } )
}
