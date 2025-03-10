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
import Duration from "./components/duration";
import RadialCollider from "./components/radialCollider";
import DestroysOnHit from "./components/destroysOnHit";

import { frameSize } from "./constants";
import Player from "./components/player";

export const asteroidPrefab = ( _world : IWorld, _opts : { tier : number, points : number, offset : number, radius : number, position? : { x : number, y : number } } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, Asteroid, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );

  Asteroid.tier[ entity ] = _opts.tier;
  Asteroid.points[ entity ] = _opts.points;

  Sprite.frame[ entity ] = getRandomInt( 4, 7 ) + _opts.offset;
  Sprite.origin.x[ entity ] = frameSize / 2;
  Sprite.origin.y[ entity ] = frameSize / 2;

  Position.x[ entity ] = _opts.position?.x || getRandomInt( 0, window.innerWidth );
  Position.y[ entity ] = _opts.position?.y || getRandomInt( 0, window.innerHeight );

  Velocity.value.x[ entity ] = getRandomInt( -8, 8 );
  Velocity.value.y[ entity ] = getRandomInt( -8, 8 );

  WrapScreen.offset[ entity ] = frameSize / 2;

  RadialCollider.radius[ entity ] = _opts.radius;
  RadialCollider.layer[ entity ] = 1;
  RadialCollider.mask[ entity ].set( [ 3 ] );
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

  addComponent( _world, Player, entity );
  addComponent( _world, PlayerInput, entity );
  addComponent( _world, TankControls, entity );
  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );

  Sprite.frame[ entity ] = 0;
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  TankControls.acceleration[ entity ] = 80;
  TankControls.rotationSpeed[ entity ] = 0.5;

  Weapon.fireRate[ entity ] = 3; // Per second

  WrapScreen.offset[ entity ] = frameSize / 2;

  RadialCollider.radius[ entity ] = 16;
  RadialCollider.layer[ entity ] = 2;
  RadialCollider.mask[ entity ].set( [ 1 ] );
}

export const projectilePrefab = ( _world : IWorld, _opts : { position : { x : number, y : number }, velocity : { x : number, y : number } } ) : void => {
  const entity = addEntity( _world );

  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, Duration, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );

  Sprite.frame[ entity ] = 20;
  Sprite.origin.x[ entity ] = frameSize / 2;
  Sprite.origin.y[ entity ] = frameSize / 2;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  Velocity.value.x[ entity ] = _opts.velocity.x;
  Velocity.value.y[ entity ] = _opts.velocity.y;

  WrapScreen.offset[ entity ] = frameSize / 2;

  Duration.value[ entity ] = 1000;

  RadialCollider.radius[ entity ] = 4;
  RadialCollider.layer[ entity ] = 3;
  RadialCollider.mask[ entity ].set( [ 1 ] );
}
