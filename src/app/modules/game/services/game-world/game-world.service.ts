import { Injectable } from '@angular/core';
import { createWorld, defineQuery, IWorld, removeEntity } from 'bitecs';

import { InvokableService } from '@/app/common/types';

import Asteroid from '@/game/components/asteroid';
import { asteroidPrefab, enemyPrefab, playerSpawnerPrefab } from '@/game/prefabs';
import { asteroidConfigs } from '@/game/constants';
import { createPrefab, createPrefabBundle } from '@/app/common/utilities';
import Player from '@/game/components/player';

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

  destroyAsteroids() : void
  {
    const asteroidQuery = defineQuery( [ Asteroid ] );

    const entities = asteroidQuery( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }
  }

  loadLevel( _level : number ) : void
  {
    this.destroyAsteroids();

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

    createPrefabBundle( this._world, asteroids.small, asteroidPrefab, asteroidConfigs[0] );
    createPrefabBundle( this._world, asteroids.medium, asteroidPrefab, asteroidConfigs[1] );
    createPrefabBundle( this._world, asteroids.large, asteroidPrefab, asteroidConfigs[2] );
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

  get playerCount() : number
  {
    const playerQuery = defineQuery( [ Player ] );
    return playerQuery( this._world ).length;
  }
}
