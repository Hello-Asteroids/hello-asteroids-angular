import { addComponent, addEntity, IWorld } from "bitecs";

import { getRandomInt } from "@/app/common/utilities";

import PlayerInput from "@/game/components/playerInput";
import Asteroid from "@/game/components/asteroid";
import Position from "@/game/components/position";
import Sprite from "@/game/components/sprite";
import Velocity from "@/game/components/velocity";
import WrapScreen from "@/game/components/wrapScreen";
import PlayerSpawner from "@/game/components/playerSpawner";
import Rotation from "@/game/components/rotation";
import TankControls from "@/game/components/tankControls";
import Weapon from "@/game/components/weapon";
import Duration from "@/game/components/duration";
import RadialCollider from "@/game/components/radialCollider";
import DestroysOnHit from "@/game/components/destroysOnHit";

import { ANIMATIONS, asteroidMaxSpeed, debrisMaxSpeed, frameSize } from "@/game/constants";
import Player from "@/game/components/player";
import Animation from "@/game/components/animation";
import WorthPoints from "@/game/components/worthPoints";
import Enemy from "@/game/components/enemy";

export const asteroidPrefab = ( _world : IWorld, _opts : { tier : number, points : number, offset : number, radius : number, position? : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, Asteroid, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );
  addComponent( _world, WorthPoints, entity )

  Asteroid.tier[ entity ] = _opts.tier;

  Sprite.frame[ entity ] = getRandomInt( 4, 7 ) + _opts.offset;
  Sprite.origin.x[ entity ] = frameSize / 2;
  Sprite.origin.y[ entity ] = frameSize / 2;

  Position.x[ entity ] = _opts.position?.x || getRandomInt( 0, window.innerWidth );
  Position.y[ entity ] = _opts.position?.y || getRandomInt( 0, window.innerHeight );

  Velocity.value.x[ entity ] = getRandomInt( -asteroidMaxSpeed, asteroidMaxSpeed );
  Velocity.value.y[ entity ] = getRandomInt( -asteroidMaxSpeed, asteroidMaxSpeed );

  WrapScreen.offset[ entity ] = frameSize / 2;

  RadialCollider.radius[ entity ] = _opts.radius;
  RadialCollider.layer[ entity ] = 1;
  RadialCollider.mask[ entity ].set( [ 3 ] );

  WorthPoints.value[ entity ] = _opts.points;

  return entity;
}

export const playerSpawnerPrefab = ( _world : IWorld ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, PlayerSpawner, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Duration, entity );
  addComponent( _world, RadialCollider, entity );

  Position.x[ entity ] = window.innerWidth / 2;
  Position.y[ entity ] = window.innerHeight / 2;

  Duration.value[ entity ] = 1000;

  RadialCollider.radius[ entity ] = frameSize * 3;
  RadialCollider.layer[ entity ] = 2;
  RadialCollider.mask[ entity ].set( [ 1 ] );

  return entity;
}

export const playerPrefab = ( _world : IWorld, _opts : { position : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, Player, entity );
  addComponent( _world, PlayerInput, entity );
  addComponent( _world, TankControls, entity );
  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Animation, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );

  Sprite.frame[ entity ] = 0;
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Animation.id[ entity ] = ANIMATIONS.PLAYER_IDLE;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  TankControls.acceleration[ entity ] = 80;
  TankControls.rotationSpeed[ entity ] = 0.4;

  Weapon.fireRate[ entity ] = 3; // Per second
  Weapon.projectileCount[ entity ] = 1;
  Weapon.spread[ entity ] = 20;

  WrapScreen.offset[ entity ] = frameSize / 2;

  RadialCollider.radius[ entity ] = 16;
  RadialCollider.layer[ entity ] = 2;
  RadialCollider.mask[ entity ].set( [ 1, 4 ] );

  return entity;
}

export const playerDebisPrefab = ( _world : IWorld, _opts : { index? : number, offset : number, rotation : number, position : { x : number, y : number }, velocity : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, Duration, entity )

  Sprite.frame[ entity ] = 24 + ( _opts.index || 0 );
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  Rotation.value[ entity ] = _opts.rotation;

  Velocity.value.x[ entity ] = getRandomInt( -debrisMaxSpeed, debrisMaxSpeed );
  Velocity.value.y[ entity ] = getRandomInt( -debrisMaxSpeed, debrisMaxSpeed );

  WrapScreen.offset[ entity ] = frameSize / 2;

  Duration.value[ entity ] = 1000 + ( Math.random() * 750 );

  return entity;
}

export const projectilePrefab = ( _world : IWorld, _opts : { position : { x : number, y : number }, velocity : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

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

  Duration.value[ entity ] = 800;

  RadialCollider.radius[ entity ] = 4;
  RadialCollider.layer[ entity ] = 3;
  RadialCollider.mask[ entity ].set( [ 1 ] );

  return entity;
}

export const explosionPrefab = ( _world : IWorld, _opts : { position : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, Sprite, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, Duration, entity );
  addComponent( _world, Animation, entity );

  Sprite.frame[ entity ] = 20;
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Animation.id[ entity ] = ANIMATIONS.EXPLOSION;

  Position.x[ entity ] = _opts.position.x;
  Position.y[ entity ] = _opts.position.y;

  Duration.value[ entity ] = 200;

  return entity;
}

export const enemyPrefab = ( _world : IWorld, _opts : { position : { x : number, y : number } } ) : number => {
  const entity = addEntity( _world );

  addComponent( _world, Enemy, entity );
  addComponent( _world, Weapon, entity );
  addComponent( _world, Sprite, entity );
  addComponent( _world, Animation, entity );
  addComponent( _world, Position, entity );
  addComponent( _world, Velocity, entity );
  addComponent( _world, Rotation, entity );
  addComponent( _world, WrapScreen, entity );
  addComponent( _world, RadialCollider, entity );
  addComponent( _world, DestroysOnHit, entity );

  Sprite.frame[ entity ] = 16;
  Sprite.origin.x[ entity ] = 0;
  Sprite.origin.y[ entity ] = 0;

  Animation.id[ entity ] = ANIMATIONS.ENEMY_THRUST;

  Position.x[ entity ] = _opts.position?.x || getRandomInt( 0, window.innerWidth );
  Position.y[ entity ] = _opts.position?.y || getRandomInt( 0, window.innerHeight );

  Weapon.fireRate[ entity ] = 3; // Per second

  WrapScreen.offset[ entity ] = frameSize / 2;

  RadialCollider.radius[ entity ] = 16;
  RadialCollider.layer[ entity ] = 4;
  RadialCollider.mask[ entity ].set( [ 1, 2, 3] );

  return entity;
}
