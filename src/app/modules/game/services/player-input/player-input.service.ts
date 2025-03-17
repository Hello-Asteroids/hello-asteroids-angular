import { PlayerInput } from '@/game/types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerInputService
{

  inputs : { [ key : string ] : boolean } = {};

  constructor() {}

  reset()
  {
    this.inputs = {};
  }

  get input() : PlayerInput
  {
    return {
      movement : {
        x : this.inputs['a'] || this.inputs['ArrowLeft'] ? -1 : this.inputs['d'] || this.inputs['ArrowRight'] ? 1 : 0,
        y : this.inputs['w'] || this.inputs['ArrowUp'] ? 1 : 0
      },
      shoot : this.inputs[' '] ? 1 : 0
    }
  }
}
