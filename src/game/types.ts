import { GameStateService } from "@/app/modules/game/services/game-state/game-state.service";
import { IWorld, pipe, System, Types } from "bitecs";

export const Vector2 = {
  x : Types.f32,
  y : Types.f32
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
  state : GameStateService,
  playerInput : PlayerInput
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

export function createPrefab( _world : IWorld, _cb : ( _world : IWorld, _opts ? : any ) => void, _opts? : any )
{
  _cb( _world, _opts );
}
