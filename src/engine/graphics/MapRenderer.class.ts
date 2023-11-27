import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'
import type { DrawImage } from '../types/DrawImage.type'
import Camera from './Camera.class'
import { RectCoordinates } from '../types/RectCoordinates.type'
import LevelHelper from '../level/LevelHelper.class'

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
        this.#canvas.context.translate(Math.floor(this.#canvas.center.xPix), Math.floor(this.#canvas.center.yPix))
        this.setScale(this.#config.scale)

        this.#canvas.context.translate(
            -Math.floor(this.#camera.getMapOffset().xPix),
            -Math.floor(this.#camera.getMapOffset().yPix),
        )
    }

    getCurrentViewport = (): RectCoordinates => {
        const mapOffset = this.#camera.getMapOffset()
        const xPix0 = Math.floor(mapOffset.xPix - this.#canvas.element.width / (2 * this.#config.scale))
        const yPix0 = Math.floor(mapOffset.yPix - this.#canvas.element.height / (2 * this.#config.scale))
        const xPix1 = Math.ceil(mapOffset.xPix + this.#canvas.element.width / this.#config.scale)
        const yPix1 = Math.ceil(mapOffset.yPix + this.#canvas.element.height / this.#config.scale)
        return {
            xPix0,
            yPix0,
            xPix1,
            yPix1,
        }
    }

    drawDebugGrid = (data: object): void => {
        this.#canvas.context.beginPath()
        this.#canvas.context.strokeStyle = '#f00' // some color/style
        this.#canvas.context.lineWidth = 2 / this.#config.scale
        this.#canvas.context.strokeRect(Math.ceil(data.dx), Math.ceil(data.dy), Math.ceil(data.dw), Math.ceil(data.dh))
    }

    drawImage = (data: DrawImage, isDebug: boolean = false): void => {
        this.#canvas.context.drawImage(data.img, data.sx, data.sy, data.sw, data.sh, data.dx, data.dy, data.dw, data.dh)
        if (isDebug) this.drawDebugGrid(data)
    }
}

export default MapRenderer
