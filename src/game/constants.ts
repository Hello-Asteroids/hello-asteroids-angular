export const frameSize : number = 64;

export const asteroidMaxSpeed = 25;
export const debrisMaxSpeed = 5;

export const asteroidConfigs = [
  { tier : 0, points : 100, offset : 8, radius : frameSize / 8 },
  { tier : 1, points : 50, offset : 4, radius : frameSize / 4 },
  { tier : 2, points : 20, offset : 0, radius : frameSize / 2 }
]
