import { GameStateService } from "@/app/modules/game/services/game-state/game-state.service";
import { GameWorldService } from "@/app/modules/game/services/game-world/game-world.service";
import { IWorld, pipe, System, Types } from "bitecs";

export type Vector2 = {
  x : number,
  y : number
}

export type PlayerInput = {
  movement : { x : number, y : number },
  shoot : number
}

export type AnimationConfig = {
  key : string,
  frames : {
    start : number,
    end : number
  },
  frameRate : number,
  repeat : number
}

// ECS Vector2 - needs to be a variable, not a type
export const Vector2 = {
  x : Types.f32,
  y : Types.f32
}

export const Renderable = {
	frame : Types.ui32,
	origin : Vector2
}

export interface IGameScene
{
  deltaTime : number,
  stateService : GameStateService,
  worldService : GameWorldService,
  inputService : PlayerInput
}

export class SystemPipeline
{
  private systems : Array< System< [], IWorld > >;

  constructor()
  {
    this.systems = [];
  }

  add( _system : System< [], IWorld> ) : void
  {
    this.systems.push( _system );
  }

  run( _world : IWorld ) : void
  {
    return pipe( ...this.systems )( _world );
  }

  // TODO: remove func
}

export type GameConfig = {

  startingLives : number,
  rewardLifeThreshold : number,

  asteroidStats : AsteroidStats,

  playerStats : PlayerStats,

  // enemyStats : EnemyStats - TODO

}

export type PlayerStats = {
  level : number,

  // Movement Stats
  maxSpeed : number,
  acceleration : number,
  rotationSpeed : number,

  // Weapon Stats
  fireRate : number,
  range : number,
  projectileCount : number,
  projectileSpeed : number,
  deviation : number,
  spread : number
}

export type AsteroidStats = {
  health : number,
  maxSpeed : number
}

export type Factor = {
  name : string,
  modifiers : Array<Modifier>
}

export type Modifier = {
  description : string,
  property : string,
  value : number,
  min? : number,
  operation : string,
  prefix? : string,
  sufix? : string
}
