import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { GAME_TYPE } from '@/game/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [ CommonModule ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit
{
  showOptions : boolean = false;

  gameTypes = GAME_TYPE;

  constructor( private _router : Router, private _gameStateService : GameStateService, private _gameWorldService : GameWorldService ){}

  ngOnInit(): void {
    this._gameStateService.paused = false;
    this._gameWorldService.loadLevel( 24, true );
  }

  handlePlayClicked( _type : string ) : void
  {
    switch( _type )
    {
      case 'classic' :
        this._router.navigate( [ GAME_TYPE.CLASSIC ], { queryParams : { type : _type }, skipLocationChange : true } );
        break;
      case 'roguelike' :
        this._router.navigate( [ GAME_TYPE.ROGUELIKE ], { queryParams : { type : _type }, skipLocationChange : true } );
        break;

      default :
      this.showOptions = true;
        break;
    }
  }
}
