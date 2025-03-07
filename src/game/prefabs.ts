import { addComponent, addEntity, IWorld } from "bitecs";

import { getRandomInt } from "@/app/common/utilities";

import PlayerInput from "@/game/components/playerInput";
import Asteroid from "@/game/components/asteroid";
import Position from "@/game/components/position";
import Blitter from "@/game/components/blitter";
import Velocity from "@/game/components/velocity";
import WrapScreen from "@/game/components/wrapScreen";
import PlayerSpawner from "@/game/components/playerSpawner";

export const asteroidPrefab = ( _world : IWorld, _opts : { offset : number } = { offset : 0 } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, Asteroid, entity );
  addComponent( _world, Blitter, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );

  Blitter.frame[ entity ] = getRandomInt( 4, 7 ) + _opts.offset;
  Blitter.origin.x[ entity ] = 8;
  Blitter.origin.y[ entity ] = 8;

  Position.x[ entity ] = getRandomInt( 0, window.innerWidth / 5 );
  Position.y[ entity ] = getRandomInt( 0, window.innerHeight / 5 );

  Velocity.value.x[ entity ] = getRandomInt( -8, 8 );
  Velocity.value.y[ entity ] = getRandomInt( -8, 8 );

  WrapScreen.offset[ entity ] = 8;
}

export const playerSpawnerPrefab = ( _world : IWorld ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, PlayerSpawner, entity );
  addComponent( _world, Position, entity );

  Position.x[ entity ] =( window.innerWidth / 5 ) / 2;
  Position.y[ entity ] = ( window.innerHeight / 5 ) / 2;
}

export const playerPrefab = ( _world : IWorld, _opts : { position : { x : number, y : number } } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, PlayerInput, entity );
  addComponent( _world, Blitter, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );

  Blitter.frame[ entity ] = 0;
  Blitter.origin.x[ entity ] = 8;
  Blitter.origin.y[ entity ] = 8;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  WrapScreen.offset[ entity ] = 8;
}
