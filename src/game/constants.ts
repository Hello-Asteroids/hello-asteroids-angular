import { AnimationConfig, Factor, GameConfig } from "./types";

export const frameSize : number = 64;

export const asteroidMaxSpeed = 25;
export const debrisMaxSpeed = 5;

export const ASTEROID_SPRITE_CONFIGS = [
  { tier : 0, points : 100, offset : 8, radius : frameSize / 8 },
  { tier : 1, points : 50, offset : 4, radius : frameSize / 4 },
  { tier : 2, points : 20, offset : 0, radius : frameSize / 2 }
]

export enum ANIMATIONS {
  PLAYER_IDLE = 0,
  PLAYER_THRUST = 1,
  EXPLOSION = 2,
  ENEMY_THRUST = 3
}

export const spriteAnimations : Array<AnimationConfig> = [
  {
    key : 'player_idle',
    frames : {
      start : 0,
      end : 0
    },
    frameRate : 8,
    repeat : -1
  },

  {
    key : 'player_thrust',
    frames : {
      start : 1,
      end : 3
    },
    frameRate : 10,
    repeat : -1
  },

  {
    key : 'explosion',
    frames : {
      start : 20,
      end : 22
    },
    frameRate : 16,
    repeat : 0
  },

  {
    key : 'enemy_thrust',
    frames : {
      start : 16,
      end : 19
    },
    frameRate : 8,
    repeat : -1
  }
]

export const GameConfigs : { classic : GameConfig, roguelike : GameConfig } = {
  classic : {
    startingLives : 3,
    rewardLifeThreshold : 10000,

    asteroidStats : {
      health : 1,
      maxSpeed : 25
    },

    playerStats : {
      level : 1,

      maxSpeed : 90,
      acceleration : 60,
      rotationSpeed : 0.4,

      fireRate : 3.5,
      range : 750,
      projectileCount : 1,
      projectileSpeed : 120,
      deviation : 0,
      spread : 0
    }
  },

  roguelike : {
    startingLives : 1,
    rewardLifeThreshold : 10000,

    asteroidStats : {
      health : 1,
      maxSpeed : 25
    },

    playerStats : {
      level : 1,

      maxSpeed : 90,
      acceleration : 60,
      rotationSpeed : 0.4,

      fireRate : 3.5,
      range : 750,
      projectileCount : 1,
      projectileSpeed : 120,
      deviation : 2,
      spread : 0
    }
  }
}

export const Boons : Array<Factor> = [
  {
    name : "More Dakka!",
    modifiers : [
      {
        description : "Projectile Count",
        property : "projectileCount",
        value : 1,
        operation : 'add',
        prefix: "+"
      },
      {
        description : "Projectile Spread",
        property : "spread",
        value : 5,
        operation : 'add',
        prefix : '+',
        sufix : "&deg;"
      }
    ]
  },

  {
    name : "Going Plaid",
    modifiers : [
      {
        description : "Top speed",
        property : "maxSpeed",
        value : 10,
        operation : "add_percent",
        prefix : "+",
        sufix: "%"
      }
    ]
  },

  {
    name : "Spread 'em!",
    modifiers : [
      {
        description : "Increase Projectile Spread",
        property : "spread",
        value : 10,
        operation : "add",
        prefix : "+",
        sufix: "&deg;"
      }
    ]
  },

  {
    name : "Outta Dodge",
    modifiers : [
      {
        description : "Increase Acceleration",
        property : "acceleration",
        value : 10,
        operation : "add_percent",
        prefix : "+",
        sufix: "%"
      }
    ]
  },

  {
    name : "Ridin' Shotgun",
    modifiers : [
      {
        description : "Projectile Count",
        property : "projectileCount",
        value : 3,
        operation : 'add',
        prefix: "+"
      },
      {
        description : "Increase Projectile Spread",
        property : "spread",
        value : 20,
        operation : "add",
        prefix : "+",
        sufix: "&deg;"
      },
      {
        description : "Projectile Range",
        property : "range",
        value : -30,
        operation : "add_percent",
        sufix : "%",
      }
    ]
  },

  {
    name : "It's a Longshot",
    modifiers : [
      {
        description : "Projectile Range",
        property : "range",
        value : 30,
        operation : "add_percent",
        prefix : "+",
        sufix : "%",
      },
      {
        description : "Projectile Deviation",
        property : "deviation",
        value : 5,
        operation : "add_percent",
        sufix: "%",
        prefix : "+"
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
        property : "deviation",
        value : 15,
        operation : "add_percent",
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
        property : "fireRate",
        value : -10,
        operation : "add_percent",
        sufix : "%"
      },
      {
        description : "Projectile Deviation",
        property : "deviation",
        value : 5,
        operation : "add",
        sufix : "&deg;",
        prefix : "+"
      }
    ]
  },

  {
    name : "\"Heavy\" Artillery",
    modifiers : [
      {
        description : "Projectile Speed",
        property : "projectileSpeed",
        value : -20,
        operation : "add_percent",
        sufix : "%"
      },
      {
        description : "Projectile Range",
        property : "range",
        value : -10,
        operation : "add_percent",
        sufix : "%",
      }
    ]
  },

  {
    name : "Slow and Steady",
    modifiers : [
      {
        description : "Top speed",
        property : "maxSpeed",
        value : -10,
        operation : "add_percent",
        sufix: "%"
      }
    ]
  },

  {
    name : "That's a big Dime...",
    modifiers : [
      {
        description : "Rotation Speed",
        property : "rotationSpeed",
        value : -15,
        operation : "add_percent",
        sufix: "%"
      }
    ]
  },

  {
    name : "Empty Barrel",
    modifiers : [
      {
        description : "Projectile Count",
        property : "projectileCount",
        value : -1,
        min : 1,
        operation : 'add'
      },
    ]
  }
]
