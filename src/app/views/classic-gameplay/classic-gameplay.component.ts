import { Component, effect, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import { GameConfigs } from '@/game/constants';
import { ScoreCounterComponent } from "../../common/components/hud/score-counter/score-counter.component";
import { LivesCounterComponent } from "../../common/components/hud/lives-counter/lives-counter.component";

@Component({
  selector: 'app-classic-gameplay',
  imports: [ ScoreCounterComponent, LivesCounterComponent ],
  templateUrl: './classic-gameplay.component.html',
  styleUrl: './classic-gameplay.component.css'
})
export class ClassicGameplayComponent extends GameplayComponent implements OnInit
{
  constructor( _router : Router )
  {
    super( _router );
  }

  override ngOnInit() : void
  {
    this.gameStateService.gameConfig = { ...GameConfigs.classic };
    super.ngOnInit();
  }
}
