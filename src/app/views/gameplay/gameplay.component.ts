import { Component, HostListener, inject, OnInit } from '@angular/core';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';

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

  constructor(){}

  ngOnInit(): void
  {
    this.gameStateService.reset();

    this.gameWorldService.spawnPlayer();
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
