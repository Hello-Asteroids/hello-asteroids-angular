import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levelup',
  imports: [],
  templateUrl: './levelup.component.html',
  styleUrl: './levelup.component.css'
})
export class LevelupComponent
{

  currentLevel : number;

  gameStateService = inject( GameStateService );

  constructor( private _router : Router )
  {
    this.currentLevel = this._router.getCurrentNavigation()?.extras.state?.[ 'level' ];
  }

  handleBoonClick() : void
  {
    // DO Boon application here, inject gameworldservice and such

    this.gameStateService.playerStats.level = this.currentLevel;

    this._router.navigate( [ '/roguelike' ], { skipLocationChange : true } );
  }
}
