import { Routes } from '@angular/router';

import { MainMenuComponent } from '@/app/views/main-menu/main-menu.component';
import { GameplayComponent } from '@/app/views/gameplay/gameplay.component';

export const routes : Routes = [
  {
    path : '',
    component : MainMenuComponent
  },
  {
    path : 'gameplay',
    component : GameplayComponent
  }
];
