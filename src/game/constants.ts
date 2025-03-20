import { AnimationConfig, Factor, GAME_TYPE, GameConfig, STAT_BLOCK } from "./types";

export const frameSize : number = 64;

export const debrisMaxSpeed = 5;

export const ASTEROID_SPRITE_CONFIGS = [
  { offset : 8, radius : frameSize / 8 },
  { offset : 4, radius : frameSize / 4 },
  { offset : 0, radius : frameSize / 2 }
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
    id : GAME_TYPE.CLASSIC,
    startingLives : 3,
    rewardLifeThreshold : 10000,

    asteroidStats : {
      health : { value : 1, description : 'Health' },
      maxSpeed : { value : 35, description : 'Max Speed' },
      minSpeed : { value : 5, description : 'Min Speed' },
      spawnCount : { value : 2, description : 'Spawn Count' },

      smPointValue : { value : 100, description : 'Small Asteroid Value' },
      mdPointValue : { value : 50, description : 'Medium Asteroid Value' },
      lgPointValue : { value : 20, description : 'Large Asteroid Value' }
    },

    playerStats : {
      maxSpeed : { value : 90, description : 'Max Speed' },
      acceleration : { value : 60, description : 'Acceleration' },
      rotationSpeed : { value : 0.4, description : 'Rotation Speed' },

      fireRate : { value : 4, description : 'Fire Rate' },
      range : { value : 900, description : 'Weapon Range' },
      projectileCount : { value : 1, description : 'Bullet Count' },
      projectileSpeed : { value : 120, description : 'Bullet Speed' },
      deviation : { value : 0, description : 'Bullet Deviation' },
      spread : { value : 0, description : 'Bullet Spread' }
    }
  },

  roguelike : {
    id : GAME_TYPE.ROGUELIKE,

    startingLives : 1,
    rewardLifeThreshold : 10000,

    asteroidStats : {
      health : { value : 1, description : 'Health' },
      maxSpeed : { value : 35, description : 'Max Speed' },
      minSpeed : { value : 5, description : 'Min Speed' },
      spawnCount : { value : 2, description : 'Spawn Count' },

      smPointValue : { value : 100, description : 'Small Asteroid Value', smallPrefered : true },
      mdPointValue : { value : 50, description : 'Medium Asteroid Value', smallPrefered : true },
      lgPointValue : { value : 20, description : 'Large Asteroid Value', smallPrefered : true }
    },

    playerStats : {
      maxSpeed : { value : 90, description : 'Max Speed' },
      acceleration : { value : 60, description : 'Acceleration' },
      rotationSpeed : { value : 0.4, description : 'Rotation Speed' },

      fireRate : { value : 3.5, description : 'Fire Rate' },
      range : { value : 750, description : 'Weapon Range' },
      projectileCount : { value : 1, description : 'Bullet Count' },
      projectileSpeed : { value : 100, description : 'Bullet Speed' },
      deviation : { value : 4, description : 'Bullet Deviation', smallPrefered : true },
      spread : { value : 0, description : 'Bullet Spread' }
    }
  }
}

export const Boons : Array<Factor> = [
  {
    name : "More Dakka!",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Count",
        property : "projectileCount",
        value : 1,
        operation : 'add',
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Spread",
        property : "spread",
        value : 15,
        operation : 'add',
        sufix : "&deg;"
      }
    ]
  },

  {
    name : "Going Plaid",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Top speed",
        property : "maxSpeed",
        value : 20,
        operation : "add_percent",
        sufix: "%"
      }
    ]
  },

  {
    name : "Spread 'em!",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Increase Projectile Spread",
        property : "spread",
        value : 10,
        operation : "add",
        sufix: "&deg;"
      }
    ]
  },

  {
    name : "Outta Dodge",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Increase Acceleration",
        property : "acceleration",
        value : 20,
        operation : "add_percent",
        sufix: "%"
      }
    ]
  },

  {
    name : "Ridin' Shotgun",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Count",
        property : "projectileCount",
        value : 2,
        operation : 'add',
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Increase Projectile Spread",
        property : "spread",
        value : 20,
        operation : "add",
        sufix: "&deg;"
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Increase Projectile Deviation",
        property : "deviation",
        value : 8,
        operation : "add",
        sufix: "&deg;"
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Range",
        property : "range",
        value : -35,
        operation : "add_percent",
        sufix : "%",
      }
    ]
  },

  {
    name : "It's a Longshot",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Range",
        property : "range",
        value : 30,
        operation : "add_percent",
        sufix : "%",
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Deviation",
        property : "deviation",
        value : 15,
        operation : "add_percent",
        sufix: "%",
      }
    ]
  },

  {
    name : "Mo' Money",
    modifiers : [
      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Small Asteroid Point Increase",
        property : "smPointValue",
        value : 30,
        operation : "add_percent",
        sufix : "%",
      },
    ]
  },

  {
    name : "Middle Child Syndrome",
    modifiers : [
      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Medium Asteroid Point Increase",
        property : "mdPointValue",
        value : 30,
        operation : "add_percent",
        sufix : "%",
      },
    ]
  },

  {
    name : "Bigger is Better",
    modifiers : [
      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Large Asteroid Point Increase",
        property : "lgPointValue",
        value : 30,
        operation : "add_percent",
        sufix : "%",
      },
    ]
  }
]

export const Banes : Array<Factor> = [
  {
    name : "An I Fired, An I Miss'd...",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Deviation",
        property : "deviation",
        value : 15,
        operation : "add_percent",
        sufix: "%",
      }
    ]
  },
  {
    name : "Jammed!",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Fire Rate",
        property : "fireRate",
        value : -10,
        operation : "add_percent",
        sufix : "%"
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Deviation",
        property : "deviation",
        value : 5,
        operation : "add",
        sufix : "&deg;",
      }
    ]
  },

  {
    name : "\"Heavy\" Artillery",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Speed",
        property : "projectileSpeed",
        value : -20,
        operation : "add_percent",
        sufix : "%"
      },
      {
        statBlock : STAT_BLOCK.PLAYER,
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
        statBlock : STAT_BLOCK.PLAYER,
        description : "Top speed",
        property : "maxSpeed",
        value : -15,
        operation : "add_percent",
        sufix: "%"
      }
    ]
  },

  {
    name : "That's a big Dime...",
    modifiers : [
      {
        statBlock : STAT_BLOCK.PLAYER,
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
        statBlock : STAT_BLOCK.PLAYER,
        description : "Projectile Count",
        property : "projectileCount",
        value : -1,
        min : 1,
        operation : 'add'
      },
    ]
  },

  {
    name : "You Sharded",
    modifiers : [
      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Asteroid Spawn Count",
        property : "spawnCount",
        value : 1,
        operation : 'add'
      },
    ]
  },

  {
    name : "Kick Rocks!",
    modifiers : [
      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Asteroid Max Speed",
        property : "maxSpeed",
        value : 18,
        operation : 'add_percent',
        sufix : "%"
      },

      {
        statBlock : STAT_BLOCK.ASTEROID,
        description : "Asteroid Min Speed",
        property : "minSpeed",
        value : 30,
        operation : 'add_percent',
        sufix : "%"
      },
    ]
  },
]
