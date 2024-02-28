import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'
import type { DrawImage } from '../types/DrawImage.type'

import type Camera from './Camera.class'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface MapRendererConstructor {
    config: GameConfig
    canvas: GameCanvas
    camera: Camera
}

class MapRenderer {
    readonly #config: GameConfig
    readonly #canvas: GameCanvas
    readonly #camera: Camera

    constructor(data: MapRendererConstructor) {
        this.#config = data.config
        this.#canvas = data.canvas
        this.#camera = data.camera
    }

    saveContext = (): void => {
        this.#canvas.context.save()
    }

    restoreContext = (): void => {
        this.#canvas.context.restore()
    }

    setScale = (scale: number): void => {
        this.#canvas.context.scale(scale, scale)
    }

    clearCanvas = (): void => {
        this.#canvas.context.fillStyle = '#6c757d'
        this.#canvas.context.fillRect(0, 0, this.#canvas.element.width, this.#canvas.element.height)
    }

    globalTranslate = (): void => {
        /*
        this.#canvas.element.style.transformOrigin = "0 0";
        this.#canvas.element.style.transform = `scale(${this.#config.scale})`
        */
        this.#canvas.context.translate(this.#canvas.center.xPix, this.#canvas.center.yPix)
        this.setScale(this.#config.scale)

        this.#canvas.context.translate(
            -this.#camera.getMapOffset().xPix,
            -this.#camera.getMapOffset().yPix,
        )
    }

    getCurrentViewport = (): RectCoordinates => {
        const mapOffset = this.#camera.getMapOffset()
        const xPix0 = mapOffset.xPix - this.#canvas.center.xPix / this.#config.scale
        const yPix0 = mapOffset.yPix - this.#canvas.center.yPix / this.#config.scale
        const xPix1 = mapOffset.xPix + this.#canvas.center.xPix / this.#config.scale
        const yPix1 = mapOffset.yPix + this.#canvas.center.yPix / this.#config.scale
        return {
            xPix0,
            yPix0,
            xPix1,
            yPix1,
        }
    }

    drawDebugGrid = (data: {
        dx: number
        dy: number
        dw: number
        dh: number
    }): void => {
        this.#canvas.context.beginPath()
        this.#canvas.context.strokeStyle = '#f00' // some color/style
        this.#canvas.context.lineWidth = 1
        this.#canvas.context.strokeRect(data.dx, data.dy, data.dw, data.dh)
    }

    drawImage = (data: DrawImage, isDebug: boolean = false): void => {

        this.#canvas.context.drawImage(
            data.img, 
            data.sx, 
            data.sy,
            data.sw,
            data.sh,
            data.dx,
            data.dy,
            data.dw,
            data.dh
        )
        if (isDebug) this.drawDebugGrid(data)
    }
}

export default MapRenderer
