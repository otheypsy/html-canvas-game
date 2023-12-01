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
        this.#canvas.context.translate(this.#canvas.center.xPix, this.#canvas.center.yPix)
        this.setScale(this.#config.scale)

        this.#canvas.context.translate(
            -this.#camera.getMapOffset().xPix,
            -this.#camera.getMapOffset().yPix,
        )
    }

    getCurrentViewport = (): RectCoordinates => {
        const mapOffset = this.#camera.getMapOffset()
        const xPix0 = mapOffset.xPix - this.#canvas.element.width / (2 * this.#config.scale)
        const yPix0 = mapOffset.yPix - this.#canvas.element.height / (2 * this.#config.scale)
        const xPix1 = mapOffset.xPix + this.#canvas.element.width / this.#config.scale
        const yPix1 = mapOffset.yPix + this.#canvas.element.height / this.#config.scale
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
        this.#canvas.context.strokeRect(data.dx, data.dy, data.dw, data.dh)
    }

    drawImage = (data: DrawImage, isDebug: boolean = false): void => {
        this.#canvas.context.drawImage(
            data.img, 
            Math.floor(data.sx), 
            Math.floor(data.sy),
            Math.ceil(data.sw),
            Math.ceil(data.sh),
            Math.floor(data.dx),
            Math.floor(data.dy),
            Math.ceil(data.dw),
            Math.ceil(data.dh)
        )
        if (isDebug) this.drawDebugGrid(data)
    }
}

export default MapRenderer
