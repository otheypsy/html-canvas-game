import type { PixelPosition } from '../types/PixelPosition'
import type { TilePosition } from '../types/TilePosition.type'

interface CameraContructor {
    mapCenter: PixelPosition
    xPixUnit: number
    yPixUnit: number
}

class Camera {
    #mapCenter: PixelPosition
    #xPixUnit: number
    #yPixUnit: number

    constructor(data: CameraContructor) {
        this.#mapCenter = data.mapCenter
        this.#xPixUnit = data.xPixUnit
        this.#yPixUnit = data.yPixUnit
    }

    get currentTile(): TilePosition {
        return {
            x: Math.floor(this.#mapCenter.xPix / this.#xPixUnit),
            y: Math.floor(this.#mapCenter.yPix / this.#yPixUnit),
        }
    }

    get mapCenter(): PixelPosition {
        return this.#mapCenter
    }
}

export default Camera
