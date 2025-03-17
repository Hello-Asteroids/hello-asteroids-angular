import { GameStateService } from "@/app/modules/game/services/game-state/game-state.service";
import { GameWorldService } from "@/app/modules/game/services/game-world/game-world.service";
import { IWorld, pipe, System, Types } from "bitecs";

export const Vector2 = {
  x : Types.f32,
  y : Types.f32
}

export type Vector2 = {
  x : number,
  y : number
}

export const Renderable = {
	frame : Types.ui32,
	origin : Vector2
}

export type PlayerInput = {
  movement : { x : number, y : number },
  shoot : number
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
