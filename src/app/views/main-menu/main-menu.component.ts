import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [ RouterLink ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit
{
  constructor( private _gameWorldService : GameWorldService ){}

  ngOnInit(): void {
    this._gameWorldService.loadLevel( 24 );
  }
}
