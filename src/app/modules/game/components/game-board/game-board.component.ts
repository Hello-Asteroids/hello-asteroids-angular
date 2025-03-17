import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'phaser';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { PlayerInputService } from '@/app/modules/game/services/player-input/player-input.service';
import Gameplay from '@/game/scenes/Gameplay';
import Preloader from '@/game/scenes/Preloader';

@Component({
  standalone: false,
  selector: 'app-game-board',
  templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit
{

  private _gameConfig;

  constructor( private _gameStateService : GameStateService, private _gameWorldService : GameWorldService, _playerInputService : PlayerInputService )
  {

    this._gameConfig = {
      type : Phaser.AUTO,
      parent : 'phaser-window',
      transparent: true,
      scale : {
        mode : Phaser.Scale.ScaleModes.FIT,
        width  : window.innerWidth,
        height : window.innerHeight
      },
      pixelArt : true,
      antialias : true,
      scene : [
        Preloader,
        new Gameplay( this._gameStateService, this._gameWorldService, _playerInputService )
      ],
    }
  }

  ngOnInit(): void
  {
    new Game( this._gameConfig );
  }
}
