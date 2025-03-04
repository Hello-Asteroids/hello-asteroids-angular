import { addComponent, addEntity, IWorld } from "bitecs";

import { getRandomInt } from "@/app/common/utilities";

import Asteroid from "@/game/components/asteroid";
import Position from "@/game/components/position";
import Blitter from "@/game/components/blitter";
import Velocity from "@/game/components/velocity";
import WrapScreen from "@/game/components/wrapScreen";

export function asteroidPrefab( _world : IWorld ) : void
{
  const entity = addEntity( _world );

  addComponent( _world, Asteroid, entity );
  addComponent( _world, Blitter, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );

  Blitter.frame[entity] = getRandomInt( 4, 7 );
  Blitter.origin.x[entity] = 8;
  Blitter.origin.y[entity] = 8;

  Position.x[entity] = getRandomInt( 0, window.innerWidth / 6 );
  Position.y[entity] = getRandomInt( 0, window.innerHeight / 6 );

  Velocity.value.x[entity] = getRandomInt( -8, 8 );
  Velocity.value.y[entity] = getRandomInt( -8, 8 );

  WrapScreen.offset[entity] = 8;
}
