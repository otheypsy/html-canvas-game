import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'
import type { DrawImage } from '../types/DrawImage.type'
import Camera from './Camera.class'
import { RectCoordinates } from '../types/RectCoordinates.type'

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

    globalTranslate = (): void => {
        this.#canvas.context.translate(Math.floor(this.#canvas.center.xPix), Math.floor(this.#canvas.center.yPix))
        this.setScale(this.#config.scale)
        this.#canvas.context.translate(
            -Math.floor(this.#camera.getMapOffset().xPix),
            -Math.floor(this.#camera.getMapOffset().yPix),
        )
    }

    getCurrentViewport = (): RectCoordinates => {
        const mapOffset = this.#camera.getMapOffset()
        const xPix0 = mapOffset.xPix - this.#canvas.element.width / (2 * this.#config.scale)
        const yPix0 = mapOffset.yPix - this.#canvas.element.height / (2 * this.#config.scale)
        const xPix1 = mapOffset.xPix + this.#canvas.element.width / (2 * this.#config.scale)
        const yPix1 = mapOffset.yPix + this.#canvas.element.height / (2 * this.#config.scale)
        return {
            xPix0,
            yPix0,
            xPix1,
            yPix1,
        }
    }

    drawImage = (data: DrawImage, isDebug: boolean = false): void => {
        this.#canvas.context.drawImage(
            data.img,
            data.sx,
            data.sy,
            data.sw,
            data.sh,
            Math.floor(data.dx),
            Math.floor(data.dy),
            Math.ceil(data.dw),
            Math.ceil(data.dh),
        )
        if (isDebug) {
            this.#canvas.context.beginPath()
            this.#canvas.context.strokeStyle = '#f00' // some color/style
            this.#canvas.context.lineWidth = 2 / this.#config.scale
            this.#canvas.context.strokeRect(
                Math.ceil(data.dx),
                Math.ceil(data.dy),
                Math.ceil(data.dw),
                Math.ceil(data.dh),
            )
        }
    }
}

export default MapRenderer
