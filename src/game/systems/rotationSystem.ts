import { Scene } from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";
import Rotation from "@/game/components/rotation";
import Blitter from "@/game/components/blitter";

import { objectMap as BlitterObjects } from "./blitterSystem";

export default function RotationSystem( _scene : Scene )
{

  const rotationQuery = defineQuery( [ Rotation, Blitter ] );

  return defineSystem( ( _world : IWorld ) => {

    let entities = rotationQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const blitterObject = BlitterObjects.get( entity );

      if( blitterObject )
      {

      }
    }

    return _world;
  } )
}
