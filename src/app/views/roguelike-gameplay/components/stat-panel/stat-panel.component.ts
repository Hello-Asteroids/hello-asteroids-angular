import { GameStateService } from '@/app/modules/game/services/game-state/game-state.service';
import { GameConfigs } from '@/game/constants';
import { AsteroidStats, PlayerStats, Stat } from '@/game/types';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-stat-panel',
  imports: [
    CommonModule
  ],
  templateUrl: './stat-panel.component.html',
  styleUrl: './stat-panel.component.css'
})
export class StatPanelComponent
{
  gameStateService : GameStateService = inject( GameStateService );

  private _defaultPlayerStats : PlayerStats = structuredClone( GameConfigs.roguelike.playerStats );
  private _defaultAsteroidStats : AsteroidStats = structuredClone( GameConfigs.roguelike.asteroidStats );

  constructor()
  {

  }

  get playerStats() : Array<Stat>
  {
    return Object.entries( this.gameStateService.gameConfig.playerStats ).map( ( [ key, value ] ) => {
      return value;
    } );
  }

  get asteroidStats() : Array<Stat>
  {
    return Object.entries( this.gameStateService.gameConfig.asteroidStats ).map( ( [ key, value ] ) => {
      return value;
    } );
  }

  getPlayerStatusClass( _stat : Stat ) : string
  {
    const defaultValue : Stat | undefined = Object.entries( this._defaultPlayerStats ).find( ( [ key, value ] : [ string, Stat ] ) => value.description === _stat.description )?.[1];

    if( !defaultValue || defaultValue && defaultValue.value === _stat.value )
      return 'text-white';

    return  _stat.value > defaultValue.value && !_stat.smallPrefered ? 'text-green-500' : 'text-red-600';
  }

  getAsteroidStatusClass( _stat : Stat ) : string
  {
    const defaultValue : Stat | undefined = Object.entries( this._defaultAsteroidStats ).find( ( [ key, value ] : [ string, Stat ] ) => value.description === _stat.description )?.[1];

    if( !defaultValue || defaultValue && defaultValue.value === _stat.value )
      return 'text-white';

    return   _stat.value > defaultValue.value && !_stat.smallPrefered ? 'text-red-500' : 'text-green-600';
  }
}
