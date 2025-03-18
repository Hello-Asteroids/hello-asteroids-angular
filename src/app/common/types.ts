export interface IInvokableService
{
  invoke : ( _commandParts : string[] ) => string
}

export type PlayerStats = {
  level : number,

  // Movement Stats
  maxSpeed : number,
  acceleration : number,
  rotationSpeed : number,

  // Weapon Stats
  fireRate : number,
  range : number,
  projectileCount : number,
  projectileSpeed : number,
  deviation : number,
  spread : number
}

export type AsteroidStats = {
  health : number,
  maxSpeed : number
}

export type Factor = {
  name : string,
  modifiers : Array<Modifier>
}

export type Modifier = {
  description : string,
  property : string,
  value : number,
  min? : number,
  operation : string,
  prefix? : string,
  sufix? : string
}
