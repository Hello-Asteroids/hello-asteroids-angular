export const DEFAULT_LEVEL = 1;
export const DEFAULT_SCORE = 0;
export const DEFAULT_LIVES = 3;

export const DEFAULT_PLAYER_STATS = {
  classic : {
    level : 1,


    maxSpeed : 90,
    acceleration : 80,
    rotationSpeed : 0.4,

    fireRate : 3.5,
    range : 750,
    projectileCount : 1,
    projectileSpeed : 120,
    deviation : 0,
    spread : 0
  },

  roguelike : {
    level : 1,


    maxSpeed : 90,
    acceleration : 80,
    rotationSpeed : 0.4,

    fireRate : 3.5,
    range : 750,
    projectileCount : 10,
    projectileSpeed : 320,
    deviation : 15,
    spread : 15
  }
}

export type Factor = {
  name : string,
  modifiers : Array<Modifier>
}

export type Modifier = {
  description : string,
  component : string,
  property : string,
  value : number,
  prefix? : string,
  sufix? : string
}

export const Boons : Array<Factor> = [
  {
    name : "More Dakka!",
    modifiers : [
      {
        description : "Projectile Count",
        component : "Weapon",
        property : "projectileCount",
        value : 1,
        prefix: "+"
      },
      {
        description : "Projectile Spread",
        component : "Weapon",
        property : "spread",
        value : 5,
        sufix : "%"
      }
    ]
  },

  {
    name : "Going Plaid",
    modifiers : [
      {
        description : "Top speed",
        component : "Velocity",
        property : "max",
        value : 10,
        sufix: "%"
      }
    ]
  }
]

export const Banes : Array<Factor> = [
  {
    name : "An I Fired, An I Miss'd...",
    modifiers : [
      {
        description : "Projectile Deviation",
        component : "Weapon",
        property : "deviation",
        value : 15,
        sufix: "%",
        prefix : "+"
      }
    ]
  },
  {
    name : "Jammed!",
    modifiers : [
      {
        description : "Fire Rate",
        component : "Weapon",
        property : "rate",
        value : -10,
        sufix : "%"
      },
      {
        description : "Projectile Deviation",
        component : "Weapon",
        property : "deviation",
        value : 5,
        sufix : "%",
        prefix : "+"
      }
    ]
  }
]

export type LevelUpCardConfig = {
  boon : Factor,
  bane : Factor
}
