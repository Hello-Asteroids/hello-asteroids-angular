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
  get gameStateService() : GameStateService
  {
    return this._gameStateService;
  }

  constructor( private _router : Router, private _gameStateService : GameStateService ){}

  replay()
  {
    this._gameStateService.reset();
    this._router.navigate( [ this._gameStateService.gameConfig.id ], { skipLocationChange : true } );
  }
}
