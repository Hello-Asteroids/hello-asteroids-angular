import { InvokableService } from '@/app/common/types';
import Asteroid from '@/game/components/asteroid';
import { asteroidPrefab } from '@/game/prefabs/asteroid';
import { createPrefab } from '@/game/types';
import { Injectable } from '@angular/core';
import { createWorld, defineQuery, getAllEntities, IWorld, removeEntity } from 'bitecs';

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

  loadLevel( _level : number ) : void {

    const asteroidQuery = defineQuery( [ Asteroid ] );

    const entities = asteroidQuery( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }

    for( let i = 0; i < 3; i++ )
    {
      createPrefab( this._world, asteroidPrefab );
    }
  }

  // Getters
  get world() : IWorld
  {
    return this._world;
  }
}
