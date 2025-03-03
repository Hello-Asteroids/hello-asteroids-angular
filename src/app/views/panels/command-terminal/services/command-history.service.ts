import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

export type HistoryItem = {
  command : string,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class CommandHistoryService
{

  private _history : WritableSignal<HistoryItem[]> = signal<HistoryItem[]>( [] );
  get history() : Signal<HistoryItem[]> {
    return this._history.asReadonly();
  }

  addHistory( _item : HistoryItem ) : void
  {
    this._history.update( current => [ ...current, _item ] );
  }

}
