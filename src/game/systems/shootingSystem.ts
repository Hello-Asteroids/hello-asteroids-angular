import { Scene } from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";

import { projectilePrefab } from "@/game/prefabs";
import { degToRad } from "@/game/utilities";
import { frameSize } from "@/game/constants";
import { createPrefab } from "@/app/common/utilities";

import PlayerInput from "@/game/components/playerInput";
import Rotation from "@/game/components/rotation";
import Position from "@/game/components/position";
import Weapon from "@/game/components/weapon";

  export default function ShootingSystem<T extends Scene>(  _scene : T )
  {

    const shootingQuery = defineQuery( [ PlayerInput, Weapon, Rotation, Position ] )

    return defineSystem( ( _world : IWorld ) => {

      const { time } = _scene;

      const entities = shootingQuery( _world );
      for( let i = 0; i < entities.length; i++ )
      {
        const entity = entities[i];

        if(
          PlayerInput.shoot[ entity ] === 1 &&
          ( time.now - Weapon.lastFired[ entity ] ) >= ( 1000 / Weapon.fireRate[ entity ] )
        )
        {
          Weapon.lastFired[ entity ] = time.now;

          const direction = Rotation.value[ entity ] - degToRad( 90 );
          const spreadOffset = degToRad( Weapon.spread[ entity ] ) / Weapon.projectileCount[ entity ];
          const spreadOrigin =  0;

          // Spawn projectiles
          for( let p_i = 0; p_i < Weapon.projectileCount[ entity ]; p_i++ )
          {
            const p_x = Position.x[ entity ] + Math.cos( direction ) * ( frameSize / 4 );
            const p_y = Position.y[ entity ] + Math.sin( direction ) * ( frameSize / 4 );

            const v_x = Math.cos( direction - ( spreadOrigin + ( spreadOffset * p_i ) ) ) * 130;
            const v_y = Math.sin( direction - ( spreadOrigin + ( spreadOffset * p_i ) ) ) * 130;

            createPrefab( _world, projectilePrefab, { position : { x : p_x, y : p_y }, velocity : { x : v_x, y : v_y } } );
          }
        }
      }

      return _world;
    } )
  }
