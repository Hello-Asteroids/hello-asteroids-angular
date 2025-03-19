import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BoonCardComponent } from "./components/boon-card/boon-card.component";
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import Player from '@/game/components/player';
import { Factor, Modifier, PlayerStats } from '@/game/types';
import { Banes, Boons } from '@/game/constants';

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
  gameWorldService = inject( GameWorldService );

  cards : Array<Array<Factor>>;

  constructor( private _router : Router )
  {
    this.currentLevel = this._router.getCurrentNavigation()?.extras.state?.[ 'level' ];

    this.gameWorldService.destroyQuery( [ Player ] );

    const boonIndexes : Array<number> = [];
    const baneIndexes : Array<number> = [];

    do
    {
      let boon_i = Math.round( Math.random() * ( Boons.length - 1 ) );
      let bane_i = Math.round( Math.random() * ( Banes.length - 1 ) );

      if( boonIndexes.indexOf( boon_i ) === -1 && boonIndexes.length < 3 )
      {
        boonIndexes.push( boon_i );
      }

      if( baneIndexes.indexOf( bane_i ) === -1 && baneIndexes.length < 3 )
      {
        baneIndexes.push( bane_i );
      }

    } while( boonIndexes.length < 3 || baneIndexes.length < 3 );

    this.cards = [
      [
        Boons[ boonIndexes[0] ],
        Banes[ baneIndexes[0] ]
      ],
      [
        Boons[ boonIndexes[1] ],
        Banes[ baneIndexes[1] ]
      ],
      [
        Boons[ boonIndexes[2] ],
        Banes[ baneIndexes[2] ]
      ]
    ]
  }

  handleCardClick( _selectedCard : number ) : void
  {

    const { gameConfig } = this.gameStateService;

    this.cards[ _selectedCard ].flatMap( factor => factor.modifiers ).forEach( ( mod : Modifier ) => {
      const currentValue = gameConfig.playerStats[mod.property as keyof PlayerStats];

      let newValue : number = currentValue + mod.value;

      switch( mod.operation )
      {
        case "add_percent" :
          const percentAmount = currentValue * ( Math.abs( mod.value ) / 100 );
          const dir = mod.value >= 0 ? 1 : -1;
          newValue = currentValue + ( percentAmount * dir );
          break;
      }

      if( mod.min )
      {
        newValue = Math.max( mod.min, newValue );
      }

      gameConfig.playerStats[ mod.property as keyof PlayerStats ] = newValue;
    } );

    gameConfig.playerStats.level = this.currentLevel;

    this._router.navigate( [ '/roguelike' ], { skipLocationChange : true } );
  }
}
