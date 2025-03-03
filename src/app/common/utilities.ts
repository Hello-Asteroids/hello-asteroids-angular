export function prettyNumber( _value : number | string )
{
  return _value.toLocaleString( 'en-US', { minimumIntegerDigits : 2 } );
}

export function getRandomInt( _min : number, _max : number ) : number
{
  return Math.floor( Math.random() * ( _max - _min + 1 ) ) + _min;
}
