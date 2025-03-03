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

		this.load.spritesheet( 'asteroids', '../../assets/images/spritesheets/Asteroids_Ship_0.0.1.png', { frameWidth : 16, frameHeight : 16 } );
	}

	create()
	{
		this.scene.start( 'Gameplay' );
	}
}
