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
import Duration from "@/game/components/duration";

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
          ( time.now - Weapon.lastFired[ entity ] ) >= ( 1000 / Weapon.rate[ entity ] )
        )
        {
          Weapon.lastFired[ entity ] = time.now;

          const direction = Rotation.value[ entity ] - degToRad( 90 );
          let spreadStep = 0;
          let spreadOrigin =  0;

          if( Weapon.projectileCount[ entity ] > 1 )
          {
            spreadStep = Weapon.spread[ entity ] / ( Weapon.projectileCount[ entity ] - 1 );
            spreadOrigin = -Weapon.spread[ entity ] / 2;
          }

          // Spawn projectiles
          for( let p_i = 0; p_i < Weapon.projectileCount[ entity ]; p_i++ )
          {
            const p_x = Position.x[ entity ] + Math.cos( direction ) * ( frameSize / 4 );
            const p_y = Position.y[ entity ] + Math.sin( direction ) * ( frameSize / 4 );

            const spreadAngle = degToRad( spreadOrigin + p_i * spreadStep );

            const deviation = degToRad( ( Math.random() * 2 - 1 ) * Weapon.deviation[ entity ] );

            const v_x = Math.cos( direction + spreadAngle + deviation ) * Weapon.projectileSpeed[ entity ];
            const v_y = Math.sin( direction + spreadAngle + deviation ) * Weapon.projectileSpeed[ entity ];

            const projectileEntity = createPrefab( _world, projectilePrefab, { position : { x : p_x, y : p_y }, velocity : { x : v_x, y : v_y } } );
            Duration.value[ projectileEntity ] = Weapon.range[ entity ];
          }
        }
      }

      return _world;
    } )
  }
