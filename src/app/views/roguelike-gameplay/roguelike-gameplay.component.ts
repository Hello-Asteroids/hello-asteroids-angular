import { Component, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import { HudComponent } from "../../common/components/hud/hud.component";

@Component({
  selector: 'app-roguelike-gameplay',
  imports: [ HudComponent ],
  templateUrl: './roguelike-gameplay.component.html',
  styleUrl: './roguelike-gameplay.component.css'
})
export class RoguelikeGameplayComponent extends GameplayComponent implements OnInit {
  constructor( _router : Router )
  {
    super( _router );
  }
}
