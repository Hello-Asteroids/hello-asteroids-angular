import { defineQuery, defineSystem, exitQuery, IWorld } from "bitecs";
import { IGameScene } from "../types";
import Player from "../components/player";

export default function PlayerSystem<T extends IGameScene>( _scene : T )
{

  const playerQuery = defineQuery( [ Player ] );
  const playerExitQuery = exitQuery( playerQuery );

  const { stateService: state } = _scene;

  return defineSystem( ( _world : IWorld ) => {

    let entities = playerExitQuery( _world );
    for( let i = 0; i < entities.length; i++ )
    {
      if( playerQuery( _world ).length === 0 )
      {
        state.updateLives( -1 );
      }
    }

    return _world;
  } )
}
