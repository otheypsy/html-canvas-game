import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'
import type { DrawImage } from '../types/DrawImage.type'

interface RendererContructor {
    config: GameConfig
    canvas: GameCanvas
}

class Renderer {
    readonly #config: GameConfig
    readonly #canvas: GameCanvas

    constructor(data: RendererContructor) {
        this.#config = data.config
        this.#canvas = data.canvas
    }

    drawImage = (data: DrawImage): void => {
        this.#canvas.context.drawImage(
            data.img,
            data.sx,
            data.sy,
            data.sw,
            data.sh,
            Math.ceil(data.dx * this.#config.scale + this.#canvas.center.xPix),
            Math.ceil(data.dy * this.#config.scale + this.#canvas.center.yPix),
            Math.ceil(data.dw * this.#config.scale),
            Math.ceil(data.dh * this.#config.scale),
        )
        this.#canvas.context.restore()
    }

    saveContext = (): void => {
        this.#canvas.context.save()
    }

    restoreContext = (): void => {
        this.#canvas.context.restore()
    }
}

export default Renderer
