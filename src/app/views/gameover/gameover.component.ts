import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gameover',
  imports: [ RouterLink ],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent implements OnInit
{
  gameStateService : GameStateService = inject( GameStateService );

  constructor(){}

  ngOnInit() : void {}
}
