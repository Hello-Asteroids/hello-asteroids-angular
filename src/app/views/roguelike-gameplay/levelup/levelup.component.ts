import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';
import { AsteroidStats, Factor, Modifier, PlayerStats, STAT_BLOCK } from '@/game/types';
import { Banes, Boons } from '@/game/constants';
import { FactorCardComponent } from './components/factor-card/factor-card.component';

@Component({
  selector: 'app-levelup',
  imports: [ FactorCardComponent ],
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
    this.currentLevel = this.gameStateService.level();

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

  populateCards() : void
  {
    // TODO - Move logic here, also make it better cause it sux ahh right now
  }

  handleCardClick( _selectedCard : number ) : void
  {

    const gameConfig = structuredClone( this.gameStateService.gameConfig );

    this.cards[ _selectedCard ].flatMap( factor => factor.modifiers ).forEach( ( mod : Modifier ) => {

      const statBlock = mod.statBlock === STAT_BLOCK.ASTEROID ? gameConfig.asteroidStats : gameConfig.playerStats;

      const currentValue = statBlock[ mod.property as keyof typeof statBlock ].value;
      statBlock[ mod.property as keyof typeof statBlock ].value = modifyStatValue( currentValue, mod.value, mod.operation, mod.min );
    } );

    gameConfig.playerStats.level.value = this.currentLevel;

    console.log(gameConfig);

    this.gameStateService.gameConfig = gameConfig;

    this._router.navigate( [ '/roguelike' ], { skipLocationChange : true } );
  }
}

function modifyStatValue( _currentValue : number, _modifyFactor : number, _operation : string, _min? : number ) : number
{
  console.log( _currentValue, _modifyFactor, _operation, _min );
  let value = _currentValue;
  switch( _operation )
  {
    case "add_percent" :
      value = _currentValue * ( 1 + _modifyFactor / 100 );
      break;

    default :
      value = _currentValue + _modifyFactor;
      break;
  }

  if( _min )
  {
    value = Math.max( _min, value );
  }

  return value;
}
