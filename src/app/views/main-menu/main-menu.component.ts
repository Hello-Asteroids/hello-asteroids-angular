import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
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

  constructor( private _router : Router, private _gameWorldService : GameWorldService ){}

  ngOnInit(): void {
    this._gameWorldService.loadLevel( 24 );
  }

  handlePlayClicked( _type : string ) : void
  {
    switch( _type )
    {
      case 'classic' :
        this._router.navigate( [ '/classic' ], { queryParams : { type : _type }, skipLocationChange : true } );
        break;
      case 'roguelike' :
        this._router.navigate( [ '/roguelike' ], { queryParams : { type : _type }, skipLocationChange : true } );
        break;

      default :
      this.showOptions = true;
        break;
    }
  }
}
