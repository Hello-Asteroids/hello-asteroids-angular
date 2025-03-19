import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: 'app-lives-counter',
  imports: [],
  templateUrl: './lives-counter.component.html',
  styleUrl: './lives-counter.component.css'
})
export class LivesCounterComponent {

  private _gameStateService : GameStateService = inject( GameStateService );

  livesArray = computed( () => {
    return Array<undefined>( this._gameStateService.lives() );
  } )
}
