import type { PixelPosition } from '../types/PixelPosition'
import type { Direction } from '../types/Direction.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

class MapMovable {
    protected moveSpeed: number = 1
    protected mapPixPos: PixelPosition = {
        xPix: 0,
        yPix: 0,
    }

    setMoveSpeed = (moveSpeed: number): void => {
        this.moveSpeed = moveSpeed
    }

    getMoveSpeed = (): number => {
        return this.moveSpeed
    }

    setMapPixPos = (xPix, yPix): void => {
        this.mapPixPos = {
            xPix,
            yPix,
        }
    }

    getMapPixPos = (): PixelPosition => {
        return this.mapPixPos
    }

    getRect = (): RectCoordinates => {
        return {
            xPix0: this.mapPixPos.xPix,
            yPix0: this.mapPixPos.yPix,
            xPix1: this.mapPixPos.xPix,
            yPix1: this.mapPixPos.yPix,
        }
    }

    move = (direction: Direction, offset: number = 1): void => {
        this.mapPixPos.xPix += offset * this.moveSpeed * direction.xOffset
        this.mapPixPos.yPix += offset * this.moveSpeed * direction.yOffset
    }
}

export default MapMovable
