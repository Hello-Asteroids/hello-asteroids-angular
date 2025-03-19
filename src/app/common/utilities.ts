import { IWorld } from "bitecs";

export function prettyNumber( _value : number | string )
{
  return _value.toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
}

export function getRandomInt( _min : number, _max : number ) : number
{
  return Math.floor( Math.random() * ( _max - _min + 1 ) ) + _min;
}

export function createPrefab( _world : IWorld, _cb : ( _world : IWorld, _opts ? : any ) => number, _opts? : any  ) : number
{
  return _cb( _world, _opts );
}

export function createPrefabBundle(  _world : IWorld, _count : number, _cb : ( _world : IWorld, _opts ? : any ) => number, _opts? : any  ) : number[]
{
  const createdEntities = new Array<number>( _count );

  for( let i = 0; i < _count; i++ )
  {
    createdEntities.push( _cb( _world, { ..._opts, index : i } ) );
  }

  return createdEntities;
}
