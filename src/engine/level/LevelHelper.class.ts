import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { TileConfig } from '../types/TileConfig.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'
import type { TilePosition } from '../types/TilePosition.type'
import type { PixelPosition } from '../types/PixelPosition'

class LevelHelper {
    readonly pixelConfig: PixelConfig
    readonly tileConfig: TileConfig

    constructor(config: { pixelConfig: PixelConfig; tileConfig: TileConfig }) {
        this.pixelConfig = config.pixelConfig
        this.tileConfig = config.tileConfig
    }

    getMaxPix = (): PixelPosition => {
        return {
            xPix: this.tileConfig.xMax * this.pixelConfig.xPixUnit,
            yPix: (this.tileConfig.count / this.tileConfig.xMax) * this.pixelConfig.yPixUnit,
        }
    }

    getTileRect = (x: number, y: number): RectCoordinates => {
        return {
            xPix0: x * this.pixelConfig.xPixUnit,
            yPix0: y * this.pixelConfig.yPixUnit,
            xPix1: x * this.pixelConfig.xPixUnit + this.pixelConfig.xPixUnit,
            yPix1: y * this.pixelConfig.yPixUnit + this.pixelConfig.xPixUnit,
        }
    }

    indexToTile = (index: number): TilePosition => {
        const [y, x] = divMod(index, this.tileConfig.xMax)
        return { x, y }
    }

    tileToIndex = (x: number, y: number): number => {
        return y * this.tileConfig.xMax + x
    }

    tileToPix = (x: number, y: number): PixelPosition => {
        return {
            xPix: x * this.pixelConfig.xPixUnit + this.pixelConfig.xPixUnit / 2,
            yPix: y * this.pixelConfig.yPixUnit + this.pixelConfig.yPixUnit / 2,
        }
    }

    pixToTile = (xPix: number, yPix: number): TilePosition => {
        return {
            x: Math.floor(xPix / this.pixelConfig.xPixUnit),
            y: Math.floor(yPix / this.pixelConfig.yPixUnit),
        }
    }
}

export default LevelHelper
