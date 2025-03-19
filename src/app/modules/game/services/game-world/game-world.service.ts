import { Injectable } from '@angular/core';
import { Component, createWorld, defineQuery, getAllEntities, IWorld, removeEntity } from 'bitecs';

import { IInvokableService, PlayerStats } from '@/app/common/types';

import Player from '@/game/components/player';
import Asteroid from '@/game/components/asteroid';
import Weapon from '@/game/components/weapon';
import Velocity from '@/game/components/velocity';
import { asteroidPrefab, playerSpawnerPrefab } from '@/game/prefabs';
import { asteroidConfigs } from '@/game/constants';
import { createPrefab, createPrefabBundle } from '@/app/common/utilities';
import TankControls from '@/game/components/tankControls';

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

    this.destroyQuery( [ Asteroid ] );

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
    const query = defineQuery( [ Player, Weapon, Velocity ] );
    const entities = query( this._world );

    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      removeEntity( this._world, entity );
    }

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

  invoke(_commandParts: string[]) : string
  {
    const command = _commandParts[1]

    console.log( typeof( ( this as any )[command]() ) )

    return '';
  };
}
