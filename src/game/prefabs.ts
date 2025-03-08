import { addComponent, addEntity, IWorld } from "bitecs";

import { getRandomInt } from "@/app/common/utilities";

import PlayerInput from "@/game/components/playerInput";
import Asteroid from "@/game/components/asteroid";
import Position from "@/game/components/position";
import Sprite from "@/game/components/sprite";
import Velocity from "@/game/components/velocity";
import WrapScreen from "@/game/components/wrapScreen";
import PlayerSpawner from "@/game/components/playerSpawner";
import Rotation from "./components/rotation";
import TankControls from "./components/tankControls";
import Weapon from "./components/weapon";
import { frameSize } from "./constants";

export const asteroidPrefab = ( _world : IWorld, _opts : { offset : number } = { offset : 0 } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, Asteroid, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );

  Sprite.frame[ entity ] = getRandomInt( 4, 7 ) + _opts.offset;
  Sprite.origin.x[ entity ] = 8;
  Sprite.origin.y[ entity ] = 8;

  Position.x[ entity ] = getRandomInt( 0, window.innerWidth );
  Position.y[ entity ] = getRandomInt( 0, window.innerHeight );

  Velocity.value.x[ entity ] = getRandomInt( -8, 8 );
  Velocity.value.y[ entity ] = getRandomInt( -8, 8 );

  WrapScreen.offset[ entity ] = 8;
}

export const playerSpawnerPrefab = ( _world : IWorld ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, PlayerSpawner, entity );
  addComponent( _world, Position, entity );

  Position.x[ entity ] = window.innerWidth / 2;
  Position.y[ entity ] = window.innerHeight / 2;
}

export const playerPrefab = ( _world : IWorld, _opts : { position : { x : number, y : number } } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, PlayerInput, entity );
  addComponent( _world, TankControls, entity );
  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, WrapScreen, entity );

  Sprite.frame[ entity ] = 0;
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  TankControls.acceleration[ entity ] = 80;
  TankControls.rotationSpeed[ entity ] = 0.5;

  Weapon.fireRate[ entity ] = 3; // Per second

  WrapScreen.offset[ entity ] = frameSize / 2;
}

export const projectilePrefab = ( _world : IWorld, _opts : { position : { x : number, y : number }, velocity : { x : number, y : number } } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );

  Sprite.frame[ entity ] = 20;
  Sprite.origin.x[ entity ] = frameSize / 2;
  Sprite.origin.y[ entity ] = frameSize / 2;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  Velocity.value.x[ entity ] = _opts.velocity.x;
  Velocity.value.y[ entity ] = _opts.velocity.y;

  WrapScreen.offset[ entity ] = frameSize / 2;
}
