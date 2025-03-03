import { computed, Injectable, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { InvokableService } from '@/app/common/types';

const DEFAULT_LEVEL = 1;
const DEFAULT_SCORE = 0;
const DEFAULT_LIVES = 3;

@Injectable( {
  providedIn : 'root'
} )
export class GameStateService extends InvokableService
{

  private _level : WritableSignal<number> = signal( DEFAULT_LEVEL );
  private _score : WritableSignal<number> = signal( DEFAULT_SCORE );
  private _hi_score : WritableSignal<number> = signal( +( window.sessionStorage.getItem( 'hi-score' ) || 0 ) );
  private _lives : WritableSignal<number> = signal( DEFAULT_LIVES );

  constructor()
  {
    super();
  }

  reset() : void
  {
    this._level.set( DEFAULT_LEVEL );
    this._score.set( DEFAULT_SCORE );
    this._lives.set( DEFAULT_LIVES );
  }

  updateLives( value : number ) : void
  {
    this._lives.update( current => current + +value );
  }

  updateScore( value : number ) : void
  {
    this._score.update( current => current + +value );

    if( this._score() > this._hi_score() )
      this._hi_score.set( this._score() );
  }

  // Computed
  livesCount = computed( () => {
    return Array.from( { length : this._lives() }, ( _, i ) => i );
  } )

  scoreCount = computed( () => {
    return this._score().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )

  hiScoreCount = computed( () => {
    return this._hi_score().toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
  } )
}
