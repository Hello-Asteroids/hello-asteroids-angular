import { Component, OnInit } from '@angular/core';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { Router } from '@angular/router';
import { HudComponent } from "../../common/components/hud/hud.component";

@Component({
  selector: 'app-classic-gameplay',
  imports: [ HudComponent ],
  templateUrl: './classic-gameplay.component.html',
  styleUrl: './classic-gameplay.component.css'
})
export class ClassicGameplayComponent extends GameplayComponent implements OnInit {
  constructor( _router : Router )
  {
    super( _router );
  }
}
