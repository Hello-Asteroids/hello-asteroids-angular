import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { SlidingWindowComponent } from "@/app/common/components/sliding-window/sliding-window.component";
import { FormsModule } from '@angular/forms';
import { CommandHistoryService, HistoryItem } from './services/command-history.service';
import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { InvokableService } from '@/app/common/types';
import { NgIf } from '@angular/common';
import { GameWorldService } from '@/app/modules/game/services/game-world/game-world.service';

@Component({
  selector: 'app-command-terminal',
  imports: [
    SlidingWindowComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './command-terminal.component.html',
  styleUrl: './command-terminal.component.css'
})
export class CommandTerminalComponent implements OnInit
{

  private _commandValue : string = '';
  private _commandIndex : number = 0;

  private _commandHistory = inject( CommandHistoryService );
  get commandHistory()
  {
    return this._commandHistory;
  }

  private _registeredServices : Map<string, InvokableService> = new Map();

  constructor( private _gameStateService : GameStateService, private _gameWorldService : GameWorldService ){}

  ngOnInit() : void
  {
    this._registeredServices.set( 'gamestate', this._gameStateService );
    this._registeredServices.set( 'gameworld', this._gameWorldService );
  }

  handleCommandSubmit( _event : Event ) : void
  {
    const target = _event.target as HTMLInputElement;
    const value = target.value;

    this._commandIndex = 0;

    const newHistoryItem : HistoryItem = {
      command : value,
      message : ''
    }

    if( value === '--help' )
    {
      newHistoryItem.message = `[Help]: Registered services available are ${ Array.from(this._registeredServices.keys()).join( ', ' ) }`;
    }
    else
    {
      const commandParts = value.split( " " );

      const service = this._registeredServices.get( commandParts[0] );

      const command = commandParts[1];

      if( command && service )
      {
        switch( typeof( ( service as any )[command] ) )
        {
          case 'function' :
            // For the record, I hate this
            ( service as any )[command]( commandParts[2], commandParts[3], commandParts[4] );
            break;

          case 'object' :
            console.log( ( service as any )[command] )
            newHistoryItem.message = JSON.stringify( ( service as any )[command] );
            break;
          default :
            newHistoryItem.message = ( service as any )[command];
            break;
        }
      }
    }

    this._commandHistory.addHistory( newHistoryItem );
    target.value = "";
  }

  handlePopHistory( _event : Event ) : void
  {
    const target = _event.target as HTMLInputElement;

    const history = this._commandHistory.history();

    this._commandIndex++;

    const historyItem = history[ Math.max( 0, history.length - this._commandIndex ) ];

    if( historyItem )
      target.value = historyItem.command;
  }
}
