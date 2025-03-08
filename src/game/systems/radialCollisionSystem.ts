import { addComponent, defineQuery, defineSystem, IWorld, Not } from "bitecs";
import { Scene } from "phaser";
import RadialCollider from "../components/radialCollider";
import Position from "../components/position";
import Collision from "../components/collision";

export default function RadialCollisionSystem( _scene : Scene )
{

  const colliderQuery = defineQuery( [ RadialCollider, Position, Not( Collision ) ] );

  return defineSystem( ( _world : IWorld ) => {

    const entities = colliderQuery( _world );

    for( let i = 0; i < entities.length; i++ )
    {
      const i_e = entities[i];

      for( let j = 0; j < entities.length; j++ )
      {
        const j_e = entities[j];

        if( i_e !== j_e && RadialCollider.mask[ i_e ].includes( RadialCollider.layer[ j_e ] ) )
        {
          const i_radius = RadialCollider.radius[ i_e ];
          const j_radius = RadialCollider.radius[ j_e ];
          const i_vector = new Phaser.Math.Vector2( Position.x[i_e], Position.y[i_e] );
          const j_vector = new Phaser.Math.Vector2( Position.x[j_e], Position.y[j_e] );

          const distance = Phaser.Math.Distance.BetweenPoints( i_vector, j_vector );

          if( distance - i_radius - j_radius <= 1 )
          {
            addComponent( _world, Collision, i_e );
            Collision.eid[ i_e ] = j_e;
          }
        }
      }
    }

    return _world;
  } )
}
