import { Scene } from 'phaser';

import type {
	IWorld,
} from 'bitecs';
import { IGameScene, PlayerInput, SystemPipeline } from '@/game/types';
import BlitterSystem from '@/game/systems/blitterSystem';
import VelocitySystem from '@/game/systems/velocitySystem';
import WrapScreenSystem from '@/game/systems/wrapScreenSystem';
import PlayerSpawnSystem from '@/game/systems/playerSpawnSystem';
import PlayerInputSystem from '@/game/systems/playerInputSystem';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';

export default class Gameplay extends Scene implements IGameScene
{

  private _world! : IWorld;
	get world() : IWorld
	{
		return this._world;
	}

  private _playerInput : PlayerInputService;
  get playerInput() : PlayerInput
  {
    return this._playerInput.input;
  }

  private _systems! : SystemPipeline;

  private _blitter! : Phaser.GameObjects.Blitter;
	get blitter() : Phaser.GameObjects.Blitter
	{
		return this._blitter;
	}

  private _deltaTime : number = 0.16;
  get deltaTime() : number
  {
     return this._deltaTime;
  }

	constructor( _worldService : GameWorldService, _inputService : PlayerInputService )
	{
		super( 'Gameplay' );

    this._world = _worldService.world;
    this._playerInput = _inputService;
	}

	preload() : void
	{
    console.log( '[Preload Gameplay scene]' );
		this._blitter = this.add.blitter( 0, 0, 'asteroids' );
	}

	create() : void
	{
		console.log( '[Initializing Gameplay scene]' );

		// this._world = createWorld();
    this._systems = new SystemPipeline();

    this.initialize();
	}

  initialize()
  {
    this._systems.add( BlitterSystem( this, this._blitter ) );
    this._systems.add( PlayerSpawnSystem( this ) );
    this._systems.add( PlayerInputSystem( this ) );
    this._systems.add( VelocitySystem( this ) );
    this._systems.add( WrapScreenSystem( this ) );
  }

  override update( _time : number, _delta : number ) : void
  {
    console.log( JSON.stringify( this.playerInput ) )
    this._deltaTime = _delta / 100;
    this._systems.run( this._world );
  }
}
