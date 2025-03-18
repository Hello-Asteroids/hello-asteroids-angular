import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BoonCardComponent } from "./components/boon-card/boon-card.component";
import { Banes, Boons, LevelUpCardConfig } from '@/app/common/constants';

@Component({
  selector: 'app-levelup',
  imports: [BoonCardComponent],
  templateUrl: './levelup.component.html',
  styleUrl: './levelup.component.css'
})
export class LevelupComponent
{

  currentLevel : number;

  gameStateService = inject( GameStateService );

  cards : Array<LevelUpCardConfig>;

  constructor( private _router : Router )
  {
    this.currentLevel = this._router.getCurrentNavigation()?.extras.state?.[ 'level' ];

    this.cards = [
      {
        boon : Boons[ Math.round( Math.random() * (Boons.length - 1) ) ],
        bane : Banes[ Math.round( Math.random() *( Banes.length - 1) ) ]
      },
      {
        boon : Boons[ Math.round( Math.random() * (Boons.length - 1) ) ],
        bane : Banes[ Math.round( Math.random() *( Banes.length - 1) ) ]
      },
      {
        boon : Boons[ Math.round( Math.random() * (Boons.length - 1) ) ],
        bane : Banes[ Math.round( Math.random() *( Banes.length - 1) ) ]
      }
    ]
    console.log(this.cards);
  }

  handleCardClick( _selectedCard : number ) : void
  {
    const card = this.cards[ _selectedCard ];



    this.gameStateService.playerStats.level = this.currentLevel;

    this._router.navigate( [ '/roguelike' ], { skipLocationChange : true } );
  }
}
