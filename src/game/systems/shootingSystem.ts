import { Scene } from "phaser";
import { defineQuery, defineSystem } from "bitecs";
import type { IWorld } from "bitecs";

import PlayerInput from "@/game/components/playerInput";
import Rotation from "@/game/components/rotation";
import Position from "@/game/components/position";
import Weapon from "@/game/components/weapon";
import { projectilePrefab } from "@/game/prefabs";
import { degToRad } from "@/game/utilities";
import { frameSize } from "@/game/constants";
import { createPrefab } from "@/app/common/utilities";

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
          const rotation = Rotation.value[ entity ];
          const r_offset = degToRad( 90 );
          Weapon.lastFired[ entity ] = time.now;
          // Spawn projectile
          const p_x = Position.x[ entity ] + Math.cos( rotation - r_offset ) * ( frameSize / 2 );
          const p_y = Position.y[ entity ] + Math.sin( rotation - r_offset ) * ( frameSize / 2 );

          const v_x = Math.cos( rotation - r_offset ) * 130
          const v_y = Math.sin( rotation - r_offset ) * 130
          createPrefab( _world, projectilePrefab, { position : { x : p_x, y : p_y }, velocity : { x : v_x, y : v_y } } );
        }
      }

      return _world;
    } )
  }
