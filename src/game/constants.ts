export const frameSize : number = 64;

export const asteroidMaxSpeed = 25;
export const debrisMaxSpeed = 5;

export const asteroidConfigs = [
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

export const spriteAnimations = [
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
