import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Stat } from '@/game/types';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-stat-panel',
  imports: [],
  templateUrl: './stat-panel.component.html',
  styleUrl: './stat-panel.component.css'
})
export class StatPanelComponent
{
  gameStateService : GameStateService = inject( GameStateService );

  get playerStats() : Array<Stat>
  {
    return Object.entries( this.gameStateService.gameConfig.playerStats ).map( ( [ key, value ] ) => {
      return value;
    } );
  }

  get asteroidStats() : Array<Stat>
  {
    return Object.entries( this.gameStateService.gameConfig.asteroidStats ).map( ( [ key, value ] ) => {
      return value;
    } );
  }
}
