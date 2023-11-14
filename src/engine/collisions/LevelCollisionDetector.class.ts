import type Level from '../level/Level.class'
import type MapMovable from '../abstract/MapMovable.class'
import type { Direction } from '../types/Direction.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

/*
Selecting Collision Tiles -- OLD
THIS MIGHT HAVE NON-REQUIRED LOOPS
return this.#collisionTiles.reduce((aggregate, collision): object[] => {
    const [y, x] = divMod(collision, this.#tileConfig.xMax)
    if (
        x > actorTilePosition.x - 3 &&
        x < actorTilePosition.x + 4 &&
        y > actorTilePosition.y - 3 &&
        y < actorTilePosition.y + 4
    ) {
        return [
            ...aggregate,
            {
                x0: x * this.#pixelConfig.xPixUnit,
                y0: y * this.#pixelConfig.yPixUnit,
                x1: x * this.#pixelConfig.xPixUnit + this.#pixelConfig.xPixUnit,
                y1: y * this.#pixelConfig.yPixUnit + this.#pixelConfig.xPixUnit,
            },
        ]
    }
    return aggregate
}, [])

 */

class LevelCollisionDetector {
    #checkCollision = (rect1: RectCoordinates, rect2: RectCoordinates): boolean => {
        // Check if Rect-1 Area is zero
        if (rect1.x0 === rect1.x1 || rect1.y0 === rect1.y1) return false

        // Check if Rect-2 Area is zero
        if (rect2.x0 === rect2.x1 || rect2.y0 === rect2.y1) return false

        // Horizontal Check
        if (rect1.x0 >= rect2.x1 || rect2.x0 >= rect1.x1) return false

        // Vertical Check
        if (rect1.y0 >= rect2.y1 || rect2.y0 >= rect1.y1) return false

        return true
    }

    checkCollision = (level: Level, actor: MapMovable, direction: Direction, offset: number = 1): boolean => {
        const currentPix = actor.getMapPixPos()
        const { x, y } = level.pixToTile(currentPix.xPix, currentPix.yPix)
        for (let i = x - 3; i <= x + 3; i++) {
            for (let j = y - 3; j <= y + 3; j++) {
                for (const layer of level.getTileMaps('collisions')) {
                    const index = level.tileToIndex(i, j)
                    if (layer.data[index]?.toString() !== '0') {
                        const actorRect = actor.getRect()
                        const collisionRect = level.getTileRect(i, j)
                        actorRect.x0 += offset * actor.getMoveSpeed() * direction.xOffset
                        actorRect.x1 += offset * actor.getMoveSpeed() * direction.xOffset
                        actorRect.y0 += offset * actor.getMoveSpeed() * direction.yOffset
                        actorRect.y1 += offset * actor.getMoveSpeed() * direction.yOffset
                        if (this.#checkCollision(actorRect, collisionRect)) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}

export default LevelCollisionDetector
