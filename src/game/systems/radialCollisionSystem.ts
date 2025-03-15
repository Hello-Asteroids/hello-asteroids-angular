import { Scene } from "phaser";
import { addComponent, defineQuery, defineSystem, Not, removeComponent } from "bitecs";
import type { IWorld } from "bitecs";

import RadialCollider from "@/game/components/radialCollider";
import Position from "@/game/components/position";
import Collision from "@/game/components/collision";

export default function RadialCollisionSystem( _scene : Scene )
{

  const colliderQuery = defineQuery( [ RadialCollider, Position, Not( Collision ) ] );
  const collisionQuery = defineQuery( [ RadialCollider, Position, Collision ] );

  return defineSystem( ( _world : IWorld ) => {

    let entities = colliderQuery( _world );

    for( let i = 0; i < entities.length; i++ )
    {
      const i_e = entities[i];

      for( let j = 0; j < entities.length; j++ )
      {
        const j_e = entities[j];

        if( i_e !== j_e && RadialCollider.mask[ i_e ].includes( RadialCollider.layer[ j_e ] ) )
        {
          if( isColliding( i_e, j_e ) )
          {
            addComponent( _world, Collision, i_e );
            Collision.eid[ i_e ] = j_e;
          }
        }
      }
    }

    entities = collisionQuery( _world )
    for( let i = 0; i < entities.length; i++ )
    {
      const entity = entities[i];
      const collidedWith = Collision.eid[ entity ];

      if( !isColliding( entity, collidedWith ) )
      {
        removeComponent( _world, Collision, entity );
      }
    }

    return _world;
  } )
}

function isColliding( entityA : number, entityB : number ) : boolean
{
  const circle_a = { x : Position.x[ entityA ], y : Position.y[ entityA ], radius : RadialCollider.radius[ entityA ] }
  const circle_b = { x : Position.x[ entityB ], y : Position.y[ entityB ], radius : RadialCollider.radius[ entityB ] }

  const distance_x = circle_a.x - circle_b.x;
  const distance_y = circle_a.y - circle_b.y;
  const distanceSquared = ( distance_x * distance_x ) + ( distance_y * distance_y );

  const radiusTotal = circle_a.radius + circle_b.radius;
  const radiusSquared = radiusTotal * radiusTotal;

  return distanceSquared <= radiusSquared;
}
