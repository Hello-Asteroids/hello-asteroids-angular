import { Routes } from '@angular/router';

import { MainMenuComponent } from '@/app/views/main-menu/main-menu.component';
import { GameoverComponent } from './views/gameover/gameover.component';
import { ClassicGameplayComponent } from './views/classic-gameplay/classic-gameplay.component';
import { RoguelikeGameplayComponent } from './views/roguelike-gameplay/roguelike-gameplay.component';
import { LevelupComponent } from './views/levelup/levelup.component';

export const routes : Routes = [
  {
    path : '',
    component : MainMenuComponent
  },
  {
    path : 'classic',
    component : ClassicGameplayComponent
  },
  {
    path : 'roguelike',
    component : RoguelikeGameplayComponent
  },
  {
    path : 'levelup',
    component : LevelupComponent
  },
  {
    path : 'gameover',
    component : GameoverComponent
  }
];
