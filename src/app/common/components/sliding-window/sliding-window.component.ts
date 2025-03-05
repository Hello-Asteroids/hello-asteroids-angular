import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sliding-window',
  imports: [
    CommonModule
  ],
  templateUrl: './sliding-window.component.html',
  styleUrl: './sliding-window.component.css'
})
export class SlidingWindowComponent {

  isActive = false;

  @HostListener( 'document:keydown', [ '$event' ] )
  handleKeyboardEvent( _event : KeyboardEvent ) : void
  {
    if( _event.key === '~' )
    {
      _event.preventDefault();
      this.isActive = !this.isActive;
    }
  }

}
