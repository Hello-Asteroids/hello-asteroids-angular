import { Component, effect, HostListener, inject, OnInit } from '@angular/core';

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


  constructor( private _router: Router  ){
    effect( () => {
      if( this.gameStateService.lives() > 0 )
      {
        this.gameWorldService.spawnPlayer();
      }
      else
      {
        this._router.navigate( [ '/gameover' ] );
      }
    } )
  }

  ngOnInit(): void
  {
    // this.gameWorldService.spawnPlayer();
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
