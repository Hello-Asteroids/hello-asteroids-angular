import { Injectable } from '@angular/core';
import { Component, createWorld, defineQuery, getAllEntities, IWorld, removeEntity } from 'bitecs';

import { IInvokableService } from '@/app/common/types';

import componentMap from '@/game/components';
import { asteroidPrefab, playerSpawnerPrefab } from '@/game/prefabs';
import { ASTEROID_SPRITE_CONFIGS } from '@/game/constants';
import { createPrefab, createPrefabBundle } from '@/app/common/utilities';

@Injectable({
  providedIn: 'root'
})
export class GameWorldService implements IInvokableService
{

  private _world : IWorld;

  constructor()
  {
    this._world = createWorld();
  }

  clear() : void
  {
    const entities = getAllEntities( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }
  }

  destroyQuery( _queryComponents : Array<Component> ) : void
  {
    const query = defineQuery( _queryComponents );

    const entities = query( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }
  }

  loadLevel( _level : number, _clearWorld? : boolean ) : void
  {

    if( _clearWorld )
      this.clear();

    this.destroyQuery( [ componentMap['Asteroid'] ] );

    let i;

    const asteroids = [ 0, 0, 3];

    for( i = 0; i < _level - 1; i++ )
    {
      if( asteroids[0] < 3 )
      {
        asteroids[0] += 2;
      }
      else
      {
        asteroids[0] = 1;
        asteroids[1] += 2;
      }

      if( asteroids[1] > 2 )
      {
        asteroids[1] = 1;
        asteroids[2]++;
      }
    }

    for( i = 0; i < 3; i++ )
    {
      createPrefabBundle( this._world, asteroids[i], asteroidPrefab, { tier : i, display : ASTEROID_SPRITE_CONFIGS[i] } );
    }
  }

  spawnPlayer() : void
  {
    createPrefab( this._world, playerSpawnerPrefab );
  }

  refreshPlayer() : void
  {
    this.destroyQuery( [ componentMap['Player'] ] );
    this.spawnPlayer();
  }

  // Getters
  get world() : IWorld
  {
    return this._world;
  }

  get playerCount() : number
  {
    const playerQuery = defineQuery( [ componentMap['Player'] ] );
    return playerQuery( this._world ).length;
  }

  invoke(_commandParts: string[]) : string
  {
    const command = _commandParts[1]

    console.log( typeof( ( this as any )[command]() ) )

    return '';
  };
}
