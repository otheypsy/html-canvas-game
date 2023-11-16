import type { PixelPosition } from '../types/PixelPosition'

class Camera {
    #width: number
    #height: number
    #mapOffset: PixelPosition

    setCameraWidth = (width: number): void => {
        this.#width = width
    }

    setCameraHeight = (height: number): void => {
        this.#height = height
    }

    setMapOffset = (mapOffset: PixelPosition): void => {
        this.#mapOffset = mapOffset
    }

    getMapOffset = (): PixelPosition => {
        return this.#mapOffset
    }
}

export default Camera
