import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit
{
  constructor( private _gameStateService : GameStateService ){}

  ngOnInit(): void
  {
    this._gameStateService.reset();
  }
}
