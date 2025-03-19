import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, computed, inject, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-score-counter',
  imports: [],
  templateUrl: './score-counter.component.html',
  styleUrl: './score-counter.component.css'
})
export class ScoreCounterComponent {

  private _gameStateService : GameStateService = inject( GameStateService );

  @Input() scoreType : keyof GameStateService = 'score';

  scoreDisplay = computed( () => {
    const score : WritableSignal<number> = this._gameStateService[ this.scoreType ] as  WritableSignal<number>;
    return score().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } );


}
