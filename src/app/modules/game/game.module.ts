import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameBoardComponent } from './components/game-board/game-board.component';



@NgModule( {
  declarations : [
    GameBoardComponent
  ],
  imports : [
    CommonModule,
    FormsModule
  ],
  exports: [
    GameBoardComponent
  ]
} )

export class GameModule
{

}
