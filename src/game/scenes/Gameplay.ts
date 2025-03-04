import { Scene } from 'phaser';

import type {
	IWorld,
} from 'bitecs';
import { createPrefab, IGameScene, SystemPipeline } from '@/game/types';
import BlitterSystem from '@/game/systems/blitterSystem';
import { asteroidPrefab } from '@/game/prefabs/asteroid';
import VelocitySystem from '@/game/systems/velocitySystem';
import WrapScreenSystem from '@/game/systems/wrapScreenSystem';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';

export default class Gameplay extends Scene implements IGameScene
{

  private _world! : IWorld;
	get world() : IWorld
	{
		return this._world;
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

	constructor( _service : GameWorldService )
	{
		super( 'Gameplay' );

    this._world = _service.world;
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
    this._systems.add( VelocitySystem( this ) );
    this._systems.add( WrapScreenSystem( this ) );
  }

  override update( _time : number, _delta : number ) : void
  {
    this._deltaTime = _delta / 100;
    this._systems.run( this._world );
  }
}
