import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gameover',
  imports: [ RouterLink ],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent
{
  gameStateService : GameStateService = inject( GameStateService );

  constructor( private _router : Router, private _gameStateService : GameStateService ){}

  replay()
  {
    this._router.navigate( [ this._gameStateService.type ], { skipLocationChange : true } );
  }
}
