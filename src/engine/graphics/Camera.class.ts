import type { PixelPosition } from '../types/PixelPosition'

class Camera {
    #mapOffset: PixelPosition = { xPix:0, yPix:0 }

    setMapOffset = (mapOffset: PixelPosition): void => {
        this.#mapOffset = mapOffset
    }

    getMapOffset = (): PixelPosition => {
        return this.#mapOffset
    }
}

export default Camera
