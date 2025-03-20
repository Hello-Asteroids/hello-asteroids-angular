import { GameStateService } from "@/app/modules/game/services/game-state/game-state.service";
import { GameWorldService } from "@/app/modules/game/services/game-world/game-world.service";
import { IWorld, pipe, System, Types } from "bitecs";

export enum GAME_TYPE {
  CLASSIC = 'classic',
  ROGUELIKE = 'roguelike'
}

export enum STAT_BLOCK {
  ASTEROID,
  PLAYER
}

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

  id : GAME_TYPE,

  startingLives : number,
  rewardLifeThreshold : number,

  asteroidStats : AsteroidStats,

  playerStats : PlayerStats,

  // enemyStats : EnemyStats - TODO

}

export type Stat = {
  value : number,
  description : string
}

export type PlayerStats = {
  level : Stat,

  // Movement Stats
  maxSpeed : Stat,
  acceleration : Stat,
  rotationSpeed : Stat,

  // Weapon Stats
  fireRate : Stat,
  range : Stat,
  projectileCount : Stat,
  projectileSpeed : Stat,
  deviation : Stat,
  spread : Stat
}

export type AsteroidStats = {
  health : Stat,
  maxSpeed : Stat,
  minSpeed : Stat,
  spawnCount : Stat,

  smPointValue : Stat,
  mdPointValue : Stat,
  lgPointValue : Stat
}

export type Factor = {
  name : string,
  modifiers : Array<Modifier>
}

export type Modifier = {
  statBlock : STAT_BLOCK,
  description : string,
  property : string,
  value : number,
  min? : number,
  operation : string,
  prefix? : string,
  sufix? : string
}
