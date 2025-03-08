import { Scene } from 'phaser';
import { frameSize } from '@/game/constants';

export default class Preloader extends Scene
{

	constructor()
	{
		super( 'Preloader' );
	}

	preload()
	{
		console.log( '...preloading...' );

		this.load.spritesheet( 'asteroids', '../../assets/images/spritesheets/Asteroids_SpriteSheet_0.0.2.png', { frameWidth : frameSize, frameHeight : frameSize } );
	}

	create()
	{
		this.scene.start( 'Gameplay' );
	}
}
