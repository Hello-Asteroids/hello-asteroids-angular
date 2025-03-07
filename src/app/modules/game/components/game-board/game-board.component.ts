import Gameplay from '@/game/scenes/Gameplay';
import Preloader from '@/game/scenes/Preloader';
import { Component, OnInit } from '@angular/core';
import { Game } from 'phaser';
import { GameStateService } from '../../services/game-state/game-state.service';
import { GameWorldService } from '../../services/game-world/game-world.service';
import { PlayerInputService } from '../../services/player-input/player-input.service';

@Component({
  standalone: false,
  selector: 'app-game-board',
  templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit
{

  private _gameConfig;

  constructor( private _gameWorldService : GameWorldService, _playerInputService : PlayerInputService )
  {

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
        new Gameplay( this._gameWorldService, _playerInputService )
      ],
    }
  }

  ngOnInit(): void {
    new Game( this._gameConfig );
    this._gameWorldService.loadLevel( 1 );
  }
}
