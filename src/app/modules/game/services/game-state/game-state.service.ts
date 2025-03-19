import { Injectable, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { IInvokableService } from '@/app/common/types';
import { PlayerStats } from '@/game/types';
import { DEFAULT_LEVEL, DEFAULT_LIVES, DEFAULT_PLAYER_STATS, DEFAULT_SCORE } from '@/game/constants';

@Injectable( {
  providedIn : 'root'
} )
export class GameStateService implements IInvokableService
{
  type : string = "classic";

  paused : boolean = false;

  level : WritableSignal<number> = signal( DEFAULT_LEVEL );
  score : WritableSignal<number> = signal( DEFAULT_SCORE );
  hiScore : WritableSignal<number> = signal( +( window.sessionStorage.getItem( 'hi-score' ) || 0 ) );
  lives : WritableSignal<number> = signal( DEFAULT_LIVES );

  playerStats : PlayerStats = DEFAULT_PLAYER_STATS.classic;

  private extraLives : number = 0;

  constructor(){}

  reset() : void
  {
    this.level.set( DEFAULT_LEVEL );
    this.score.set( DEFAULT_SCORE );
    this.lives.set( DEFAULT_LIVES );
    this.extraLives = 0;
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

    const newAdditionalLives = Math.floor( this.score() / 10000 );
    if( newAdditionalLives > this.extraLives )
    {
      this.updateLives( 1 );
      this.extraLives = newAdditionalLives;
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
