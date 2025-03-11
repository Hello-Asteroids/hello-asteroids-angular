import { Component, computed, effect, HostListener, inject, OnInit } from '@angular/core';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameplay',
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent implements OnInit
{
  gameStateService = inject( GameStateService );
  gameWorldService = inject( GameWorldService );
  playerInputService = inject( PlayerInputService );

  livesArray = computed( () => {
    return Array<undefined>( this.gameStateService.lives() );
  } )

  scoreDisplay = computed( () => {
    return this.gameStateService.score().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )

  hiScoreDisplay = computed( () => {
    return this.gameStateService.hiScore().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )

  constructor( private _router: Router  ){

    // Lives Effect
    effect( () => {
      const currentLives = this.gameStateService.lives();

      if( this.gameWorldService.playerCount === 0 )
      {
        if( currentLives > 0 )
        {
          this.gameWorldService.spawnPlayer();
        }
        else
        {
          this._router.navigate( [ '/gameover' ], { skipLocationChange : true } );
        }
      }
    } );

    // Level Effect
    effect( () => {
      const currentLevel = this.gameStateService.level();

      this.gameWorldService.loadLevel( currentLevel );
    } )
  }

  ngOnInit() : void
  {
    this.gameStateService.reset();
  }

  @HostListener( 'document:keydown', [ '$event' ] )
  handleKeydownEvent( _event : KeyboardEvent ) : void
  {
    this.playerInputService.inputs[ _event.key ] = true;
  }

  @HostListener( 'document:keyup', [ '$event' ] )
  handleKeyUpEvent( _event : KeyboardEvent ) : void
  {
    this.playerInputService.inputs[ _event.key ] = false;
  }
}
