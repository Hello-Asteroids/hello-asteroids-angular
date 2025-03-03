import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sliding-window',
  imports: [],
  templateUrl: './sliding-window.component.html',
  styleUrl: './sliding-window.component.css'
})
export class SlidingWindowComponent {
  @Input() width: number = 0;
}
