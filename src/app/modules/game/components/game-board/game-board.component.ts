import Gameplay from '@/game/scenes/Gameplay';
import Preloader from '@/game/scenes/Preloader';
import { Component, OnInit } from '@angular/core';
import { Game } from 'phaser';
import { GameStateService } from '../../services/game-state/game-state.service';
import { GameWorldService } from '../../services/game-world/game-world.service';

@Component({
  standalone: false,
  selector: 'app-game-board',
  templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit
{

  private _gameConfig;

  private _gameWorldService : GameWorldService;

  constructor( _gameWorldService : GameWorldService )
  {
    this._gameWorldService = _gameWorldService;

    this._gameConfig = {
      type : Phaser.AUTO,
      parent : 'phaser-window',
      transparent: true,
      scale : {
        mode : Phaser.Scale.ScaleModes.FIT,
        width  : window.innerWidth / 5,
        height : window.innerHeight / 5
      },
      pixelArt : true,
      scene : [
        Preloader,
        new Gameplay( this._gameWorldService )
      ],
    }
  }

  ngOnInit(): void {
    new Game( this._gameConfig );
    this._gameWorldService.loadLevel( 1 );
  }
}
