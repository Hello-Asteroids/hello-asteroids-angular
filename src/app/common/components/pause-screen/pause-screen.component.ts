import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pause-screen',
  imports: [
    RouterLink
  ],
  templateUrl: './pause-screen.component.html',
  styleUrl: './pause-screen.component.css'
})
export class PauseScreenComponent
{
  get gameStateService() : GameStateService
  {
    return this._gameStateService;
  }

  constructor( private _router : Router, private _gameStateService : GameStateService, private _gameWorldService : GameWorldService ){}

  resume() : void
  {
    this._gameStateService.paused = false;
  }

  replay()
  {


    let currentUrl = this._router.url;
    this._router.navigateByUrl( this._gameStateService.gameConfig.id, { skipLocationChange : true } ).then( () => {
        this._router.navigate( [ currentUrl ] );
    } );
  }
}
