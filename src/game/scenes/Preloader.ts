import { Scene } from 'phaser';

export default class Preloader extends Scene
{

	constructor()
	{
		super( 'Preloader' );
	}

	preload()
	{
		console.log( '...preloading...' );

		this.load.spritesheet( 'asteroids', '../../assets/images/spritesheets/Asteroids_SpriteSheet_0.0.2.png', { frameWidth : 64, frameHeight : 64 } );
	}

	create()
	{
		this.scene.start( 'Gameplay' );
	}
}
