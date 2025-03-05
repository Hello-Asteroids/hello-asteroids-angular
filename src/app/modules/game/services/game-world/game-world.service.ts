import { InvokableService } from '@/app/common/types';
import Asteroid from '@/game/components/asteroid';
import { asteroidPrefab, playerSpawnerPrefab } from '@/game/prefabs';
import { createPrefab } from '@/game/types';
import { Injectable } from '@angular/core';
import { createWorld, defineQuery, IWorld, removeEntity } from 'bitecs';

@Injectable({
  providedIn: 'root'
})
export class GameWorldService extends InvokableService
{

  private _world : IWorld;

  constructor()
  {
    super();
    this._world = createWorld();
  }

  loadLevel( _level : number ) : void
  {
    const asteroidQuery = defineQuery( [ Asteroid ] );

    const entities = asteroidQuery( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }

    let i;

    const asteroids = {
      large : 3,
      medium : 0,
      small : 0
    }

    for( i = 0; i < _level - 1; i++ )
    {
      if( asteroids.small < 2 )
      {
        asteroids.small++;
      }
      else
      {
        asteroids.small = 0;
        asteroids.medium++;
      }

      if( asteroids.medium >= 2 )
      {
        asteroids.medium = 0;
        asteroids.large++;
      }
    }

    for( i = 0; i < asteroids.large; i++ )
    {
      createPrefab( this._world, asteroidPrefab );
    }

    for( i = 0; i < asteroids.medium; i++ )
    {
      createPrefab( this._world, asteroidPrefab, { offset : 4 } );
    }

    for( i = 0; i < asteroids.small; i++ )
    {
      createPrefab( this._world, asteroidPrefab, { offset : 8 } );
    }
  }

  spawnPlayer() : void
  {
    createPrefab( this._world, playerSpawnerPrefab );
  }

  // Getters
  get world() : IWorld
  {
    return this._world;
  }
}
