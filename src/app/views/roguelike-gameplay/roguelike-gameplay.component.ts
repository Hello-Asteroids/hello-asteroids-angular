import { Component, effect, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import { HudComponent } from "../../common/components/hud/hud.component";
import { DEFAULT_PLAYER_STATS } from '@/game/constants';

@Component({
  selector: 'app-roguelike-gameplay',
  imports: [ HudComponent ],
  templateUrl: './roguelike-gameplay.component.html',
  styleUrl: './roguelike-gameplay.component.css'
})
export class RoguelikeGameplayComponent extends GameplayComponent implements OnInit
{
  constructor( _router : Router )
  {
    super( _router );

    // Level Effect
    effect( () => {
      const currentLevel = this.gameStateService.level();
      console.log(currentLevel, this.gameStateService.playerStats.level)
      if( currentLevel !== this.gameStateService.playerStats.level )
        _router.navigate( [ '/levelup' ], { state : { level : currentLevel }, skipLocationChange : true } );
    } )
  }

  ngOnInit() : void
  {
    this.gameStateService.type = 'roguelike';
    const currentLevel = this.gameStateService.level();

    if( currentLevel === 1 )
    {
      this.gameStateService.playerStats = DEFAULT_PLAYER_STATS.roguelike;
      // this.gameWorldService.spawnPlayer();
    }
    else
    {

    }

    this.gameWorldService.loadLevel( currentLevel );
  }
}
