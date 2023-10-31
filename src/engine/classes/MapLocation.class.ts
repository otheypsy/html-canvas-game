import type { TilePosition } from '../types/TilePosition.type'
import type { PixelPosition } from '../types/PixelPosition'
import type GameConfig from '../game/GameConfig.class'

interface LocationContrutor {
    config: GameConfig
    xPixUnit: number
    yPixUnit: number
}
class MapLocation {
    #config: GameConfig
    #xPixUnit: number
    #yPixUnit: number

    #xPix: number
    #yPix: number

    constructor(data: LocationContrutor) {
        this.#config = data.config
        this.#xPixUnit = data.xPixUnit
        this.#yPixUnit = data.yPixUnit
    }

    set tile(data: TilePosition) {
        this.#xPix = data.x * this.#xPixUnit * this.#config.scale + (this.#xPixUnit * this.#config.scale) / 2
        this.#yPix = data.y * this.#yPixUnit * this.#config.scale + (this.#yPixUnit * this.#config.scale) / 2
    }

    get tile(): TilePosition {
        return {
            x: Math.floor(this.#xPix / this.#xPixUnit),
            y: Math.floor(this.#yPix / this.#yPixUnit),
        }
    }

    set pixel(data: PixelPosition) {
        this.#xPix = data.xPix
        this.#yPix = data.yPix
    }

    get pixel(): PixelPosition {
        return {
            xPix: this.#xPix,
            yPix: this.#yPix,
        }
    }
}

export default MapLocation
