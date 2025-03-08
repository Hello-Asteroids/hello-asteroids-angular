import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gameover',
  imports: [],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent
{
  constructor( gameStateService : GameStateService )
  {

  }
}
