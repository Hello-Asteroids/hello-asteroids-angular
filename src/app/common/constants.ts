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
