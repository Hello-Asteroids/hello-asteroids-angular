import { Factor } from "./types";

export const DEFAULT_LEVEL = 1;
export const DEFAULT_SCORE = 0;
export const DEFAULT_LIVES = 3;

export const DEFAULT_PLAYER_STATS = {
  classic : {
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
  },

  roguelike : {
    level : 1,


    maxSpeed : 90,
    acceleration : 60,
    rotationSpeed : 0.4,

    fireRate : 3.5,
    range : 750,
    projectileCount : 100,
    projectileSpeed : 120,
    deviation : 100,
    spread : 0
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
