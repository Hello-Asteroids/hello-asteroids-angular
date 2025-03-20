import { Injectable, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';

import { IInvokableService } from '@/app/common/types';
import { GameConfigs } from '@/game/constants';
import type { GameConfig } from '@/game/types';

@Injectable( {
  providedIn : 'root'
} )
export class GameStateService implements IInvokableService
{

  gameConfig : GameConfig = GameConfigs.classic;

  paused : boolean = false;

  level : WritableSignal<number> = signal( 1 );
  score : WritableSignal<number> = signal( 0 );
  hiScore : WritableSignal<number> = signal( +( window.sessionStorage.getItem( 'hi-score' ) || 0 ) );
  lives : WritableSignal<number> = signal( 0 );

  private additionalLives : number = 0;

  constructor(){}

  reset() : void
  {
    if( !this.gameConfig )
      return;

    console.log( 'reset' )

    this.level.set( 1 );
    this.score.set( 0 );
    this.lives.set( this.gameConfig.startingLives );
    this.additionalLives = 0;
  }

  updateLives( value : number ) : void
  {
    this.lives.update( current => current + +value );
  }

  updateScore( value : number ) : void
  {
    this.score.update( current => current + +value );

    if( this.score() > this.hiScore() )
    {
      this.hiScore.set( this.score() );
      window.sessionStorage.setItem( 'hi-score', this.score().toString() );
    }

    const newAdditionalLives = Math.floor( this.score() / this.gameConfig.rewardLifeThreshold );
    if( newAdditionalLives > this.additionalLives )
    {
      this.updateLives( 1 );
      this.additionalLives = newAdditionalLives;
    }
  }

  incrementLevel( _delay : number ) : void
  {
    setTimeout( () => {
      this.level.update( current => current + 1 );
    }, _delay )
  }

  invoke( _commandParts: string[] ) : string
  {
    const command = _commandParts[1]

    console.log( typeof( ( this as any )[command]() ) );

    return '';
  };
}
