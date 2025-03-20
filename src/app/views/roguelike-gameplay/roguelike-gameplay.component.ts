import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ScoreCounterComponent } from "@/app/common/components/hud/score-counter/score-counter.component";
import { LivesCounterComponent } from "@/app/common/components/hud/lives-counter/lives-counter.component";
import { GameplayComponent } from '@/app/views/gameplay/gameplay.component';
import { GameConfigs } from '@/game/constants';
import { PauseScreenComponent } from "../../common/components/pause-screen/pause-screen.component";
import { CommonModule } from '@angular/common';
import { StatPanelComponent } from "./components/stat-panel/stat-panel.component";

@Component({
  selector: 'app-roguelike-gameplay',
  imports: [
    CommonModule,
    RouterOutlet,
    ScoreCounterComponent,
    LivesCounterComponent,
    PauseScreenComponent,
    StatPanelComponent
],
  templateUrl: './roguelike-gameplay.component.html',
  styleUrl: './roguelike-gameplay.component.css'
})
export class RoguelikeGameplayComponent extends GameplayComponent implements OnInit
{
  private _currentLevel! : number;

  constructor( _router : Router )
  {
    super( _router );
  }

  override ngOnInit() : void
  {
    this.gameStateService.gameConfig = { ...GameConfigs.roguelike };
    console.log( 'do?', this.gameStateService.gameConfig )
    console.log( 'done',GameConfigs.roguelike)
    super.ngOnInit();
  }

  override handleLevelUpdate( _newValue: number ) : void
  {
    if( !this._currentLevel )
      this._currentLevel = _newValue;

    if( this._currentLevel !== _newValue )
    {
      this.router.navigate( [ 'roguelike/levelup' ], { skipLocationChange : true } );
    }
    else if( _newValue === 1 )
    {
      this.gameWorldService.loadLevel( _newValue );
    }
  }

  onLevelUpSelected( _event : any ) : void
  {
    console.log('return')
    this.gameWorldService.loadLevel( this.gameStateService.level() );
    this.gameWorldService.refreshPlayer();
  }
}
