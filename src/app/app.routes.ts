import { Routes } from '@angular/router';

import { MainMenuComponent } from '@/app/views/main-menu/main-menu.component';
import { GameplayComponent } from '@/app/views/gameplay/gameplay.component';
import { GameoverComponent } from './views/gameover/gameover.component';

export const routes : Routes = [
  {
    path : '',
    component : MainMenuComponent
  },
  {
    path : 'gameplay',
    component : GameplayComponent
  },
  {
    path : 'gameover',
    component : GameoverComponent
  }
];
