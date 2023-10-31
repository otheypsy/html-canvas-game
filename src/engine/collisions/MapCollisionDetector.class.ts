import type Level from '../level/Level.class'
import MapMovable from '../abstract/MapMovable.class'

class MapCollisionDetector {
    readonly #collisionTileMap: number[]
    constructor(level: Level) {
        this.#collisionTileMap = level.getTileMaps().collisions.tileMap
    }

    checkActorCollisions = (actor: MapMovable, offset: { x: number; y: number }): boolean => {
        console.log(actor.getMapPixPos(), offset)
        return true
    }
}

export default MapCollisionDetector
