import { Vector2 } from "./types";

export function degToRad( _angle : number ) : number
{
  return _angle * (Math.PI / 180)
}

export function magnitude( _value : Vector2 ) : number
{
  return Math.sqrt( ( _value.x * _value.x ) + ( _value.y * _value.y ) );
}

export function normalize( _value : Vector2 ) : Vector2
{
  const mag = magnitude( _value );

  if( mag === 0 )
  {
    return { x : 0, y : 0 };
  }
  else
  {
    return {
      x : _value.x / mag,
      y : _value.y / mag
    }
  }
}

export function clampVector( _value : Vector2, _maxValue : number ) : Vector2
{
  const mag = magnitude( _value );

  if( mag <= _maxValue )
    return _value;

  const scale = _maxValue / mag;
  return {
    x : _value.x * scale,
    y : _value.y * scale
  }
}
