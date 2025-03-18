import { Component, effect, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import { HudComponent } from "@/app/common/components/hud/hud.component";
import { DEFAULT_PLAYER_STATS } from '@/app/common/constants';

@Component({
  selector: 'app-classic-gameplay',
  imports: [ HudComponent ],
  templateUrl: './classic-gameplay.component.html',
  styleUrl: './classic-gameplay.component.css'
})
export class ClassicGameplayComponent extends GameplayComponent implements OnInit {
  constructor( _router : Router )
  {
    super( _router );

    // Level Effect
    effect( () => {
      const currentLevel = this.gameStateService.level();

      this.gameWorldService.loadLevel( currentLevel );
    } )
  }

  ngOnInit() : void
  {
    this.gameStateService.type = 'classic';
    this.gameStateService.playerStats = DEFAULT_PLAYER_STATS.classic;
    this.gameStateService.reset();
  }
}
