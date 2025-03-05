import { Component, inject, effect, OnInit } from '@angular/core';

import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';

@Component({
  selector: 'app-gameplay',
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent implements OnInit
{

  gameStateService = inject( GameStateService );
  gameWorldService = inject( GameWorldService );

  constructor(){}

  ngOnInit(): void
  {
    this.gameStateService.reset();

    this.gameWorldService.spawnPlayer();
  }
}
