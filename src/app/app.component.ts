import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandTerminalComponent } from "./views/panels/command-terminal/command-terminal.component";
import { GameModule } from './modules/game/game.module';

@Component( {
  selector : 'app-root',
  imports: [
    RouterOutlet,
    CommandTerminalComponent,
    GameModule
  ],
  templateUrl : './app.component.html'
} )

export class AppComponent
{
  title = 'angular-hello-asteroids';
}
