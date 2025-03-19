import { Component, effect, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import Player from '@/game/components/player';
import { ScoreCounterComponent } from "../../common/components/hud/score-counter/score-counter.component";
import { LivesCounterComponent } from "../../common/components/hud/lives-counter/lives-counter.component";

@Component({
  selector: 'app-roguelike-gameplay',
  imports: [ ScoreCounterComponent, LivesCounterComponent ],
  templateUrl: './roguelike-gameplay.component.html',
  styleUrl: './roguelike-gameplay.component.css'
})
export class RoguelikeGameplayComponent extends GameplayComponent implements OnInit
{
  constructor( _router : Router )
  {
    super( _router );
  }

  override ngOnInit() : void
  {
    super.ngOnInit();
  }

  override handleLevelUpdate(_newValue: number): void
  {
    this.gameWorldService.destroyQuery( [ Player ] );

  }
}
