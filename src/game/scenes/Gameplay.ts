import { Scene } from 'phaser';

import type {
	IWorld,
} from 'bitecs';
import { IGameScene, PlayerInput, SystemPipeline } from '@/game/types';
import SpriteSystem from '@/game/systems/spriteSystem';
import VelocitySystem from '@/game/systems/velocitySystem';
import WrapScreenSystem from '@/game/systems/wrapScreenSystem';
import PlayerSpawnSystem from '@/game/systems/playerSpawnSystem';
import PlayerInputSystem from '@/game/systems/playerInputSystem';
import TankControlsSystem from '@/game/systems/tankControlSystem';
import ShootingSystem from '@/game/systems/shootingSystem';
import DurationSystem from '@/game/systems/durationSystem';
import RadialCollisionSystem from '@/game/systems/radialCollisionSystem';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import DestroysOnHitSystem from '../systems/destroysOnHitSystem';
import PlayerSystem from '../systems/playerSystem';
import AsteroidSystem from '../systems/asteroidSystem';
import AnimatedSpriteSystem from '../systems/animatedSpriteSystem';
import PointsSystem from '../systems/pointsSystem';

export default class Gameplay extends Scene implements IGameScene
{

  private _stateService! : GameStateService;
	get stateService() : GameStateService
	{
		return this._stateService;
	}

  private _worldService! : GameWorldService;
	get worldService() : GameWorldService
	{
		return this._worldService;
	}

	get world() : IWorld
	{
		return this._worldService.world;
	}

  private _inputService : PlayerInputService;
  get inputService() : PlayerInput
  {
    return this._inputService.input;
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

	constructor( _stateService : GameStateService, _worldService : GameWorldService, _inputService : PlayerInputService )
	{
		super( 'Gameplay' );

    this._stateService = _stateService;
    this._worldService = _worldService;
    this._inputService = _inputService;
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
    // Display Systems
    this._systems.add( SpriteSystem( this, this._blitter ) );
    this._systems.add( AnimatedSpriteSystem( this ) );

    // Game Logic Systems
    this._systems.add( PlayerSpawnSystem() );
    this._systems.add( PlayerInputSystem( this ) );
    this._systems.add( TankControlsSystem( this ) );
    this._systems.add( ShootingSystem( this ) );
    this._systems.add( PlayerSystem( this ) );
    this._systems.add( AsteroidSystem( this ) );
    this._systems.add( PointsSystem( this ) );

    // Physics Systems
    this._systems.add( VelocitySystem( this ) );
    this._systems.add( RadialCollisionSystem( this ) );

    // Utility Systems
    this._systems.add( DestroysOnHitSystem( this ) );
    this._systems.add( WrapScreenSystem( this ) );
    this._systems.add( DurationSystem( this ) );
  }

  override update( _time : number, _delta : number ) : void
  {
    this._deltaTime = _delta / 100;

    if( !this._stateService.paused )
      this._systems.run( this.world );
  }
}
