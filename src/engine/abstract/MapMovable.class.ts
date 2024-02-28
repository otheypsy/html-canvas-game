import type { PixelPosition } from '../types/PixelPosition'

class MapMovable {
    moveSpeed: number = 1
    mapPixPos: PixelPosition = {
        xPix: 0,
        yPix: 0,
    }

    setMoveSpeed = (moveSpeed: number): void => {
        this.moveSpeed = moveSpeed
    }

    getMoveSpeed = (): number => {
        return this.moveSpeed
    }

    setMapPixPos = (xPix: number, yPix: number): void => {
        this.mapPixPos = {
            xPix,
            yPix,
        }
    }

    getMapPixPos = (): PixelPosition => {
        return this.mapPixPos
    }

    move = (xOffset: number = 0, yOffset: number = 0): void => {
        this.mapPixPos.xPix += this.moveSpeed * xOffset
        this.mapPixPos.yPix += this.moveSpeed * yOffset
    }
}

export default MapMovable
