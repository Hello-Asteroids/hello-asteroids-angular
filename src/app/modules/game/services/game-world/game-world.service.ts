import { InvokableService } from '@/app/common/types';
import { Injectable } from '@angular/core';
import { createWorld, getAllEntities, IWorld, removeEntity } from 'bitecs';

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
    const entities = getAllEntities( this._world );
    for( let i = 0; i < entities.length; i++ )
    {
      removeEntity(  this._world, entities[i] );
    }
  }

  // Getters
  get world() : IWorld
  {
    return this._world;
  }
}
