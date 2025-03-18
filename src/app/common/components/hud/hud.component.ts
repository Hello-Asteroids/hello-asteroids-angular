import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: 'app-hud',
  imports: [ CommonModule ],
  templateUrl: './hud.component.html',
  styleUrl: './hud.component.css'
})
export class HudComponent {

  gameStateService = inject( GameStateService );

  livesArray = computed( () => {
    return Array<undefined>( this.gameStateService.lives() );
  } )

  scoreDisplay = computed( () => {
    return this.gameStateService.score().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )

  hiScoreDisplay = computed( () => {
    return this.gameStateService.hiScore().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )
}
