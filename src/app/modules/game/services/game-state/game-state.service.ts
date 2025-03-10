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

  level : WritableSignal<number> = signal( DEFAULT_LEVEL );
  score : WritableSignal<number> = signal( DEFAULT_SCORE );
  hiScore : WritableSignal<number> = signal( +( window.sessionStorage.getItem( 'hi-score' ) || 0 ) );
  lives : WritableSignal<number> = signal( DEFAULT_LIVES );

  constructor()
  {
    super();
  }

  reset() : void
  {
    this.level.set( DEFAULT_LEVEL );
    this.score.set( DEFAULT_SCORE );
    this.lives.set( DEFAULT_LIVES );
  }

  updateLives( value : number ) : void
  {
    this.lives.update( current => current + +value );
  }

  updateScore( value : number ) : void
  {
    this.score.update( current => current + +value );

    if( this.score() > this.hiScore() )
      this.hiScore.set( this.score() );
  }

  incrementLevel() : void
  {
    this.level.update( current => current + 1 );
  }
}
