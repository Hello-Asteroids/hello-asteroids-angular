import { Component, computed, effect, HostListener, inject, OnDestroy, OnInit } from '@angular/core';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gameplay',
  imports: [CommonModule],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent implements OnDestroy
{

  private _gameType : string = 'classic';
  get gameType() : string
  {
    return this._gameType;
  }

  gameStateService = inject( GameStateService );
  gameWorldService = inject( GameWorldService );
  playerInputService = inject( PlayerInputService );

  constructor( private _router: Router ){

    this._gameType = this._router.getCurrentNavigation()?.extras.queryParams?.[ 'type' ];

    // Lives Effect
    effect( () => {
      const currentLives = this.gameStateService.lives();

      if( this.gameWorldService.playerCount === 0 )
      {
        if( currentLives > 0 )
        {
          this.playerInputService.reset();
          this.gameWorldService.spawnPlayer();
        }
        else
        {
          this._router.navigate( [ '/gameover' ], { skipLocationChange : true } );
        }
      }
    } );
  }

  ngOnDestroy(): void
  {
    this.playerInputService.reset();
  }

  @HostListener( 'document:keydown', [ '$event' ] )
  handleKeydownEvent( _event : KeyboardEvent ) : void
  {

    switch( _event.key )
    {
      case 'Escape' :
        this.gameStateService.paused = !this.gameStateService.paused;
        break;

      default :
        this.playerInputService.inputs[ _event.key ] = true;
        break;
    }

  }

  @HostListener( 'document:keyup', [ '$event' ] )
  handleKeyUpEvent( _event : KeyboardEvent ) : void
  {
    this.playerInputService.inputs[ _event.key ] = false;
  }
}
