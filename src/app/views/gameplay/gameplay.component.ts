import { Component, inject, effect } from '@angular/core';

import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';

@Component({
  selector: 'app-gameplay',
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent {

  gameStateService = inject( GameStateService );

  spriteSheet = 'assets/images/spritesheets/Asteroids_Ship_0.0.1.png';

  constructor()
  {

  }
}
