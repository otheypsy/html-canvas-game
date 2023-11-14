import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'
import type { DrawImage } from '../types/DrawImage.type'
import type { DrawText } from '../types/DrawText.type'

interface RendererConstructor {
    config: GameConfig
    canvas: GameCanvas
}

class Renderer {
    readonly #config: GameConfig
    readonly #canvas: GameCanvas

    constructor(data: RendererConstructor) {
        this.#config = data.config
        this.#canvas = data.canvas
    }

    saveContext = (): void => {
        this.#canvas.context.save()
    }

    restoreContext = (): void => {
        this.#canvas.context.restore()
    }

    globalTranslate = (): void => {
        this.#canvas.context.translate(Math.floor(this.#canvas.center.xPix), Math.floor(this.#canvas.center.yPix))
        this.#canvas.context.scale(this.#config.scale, this.#config.scale)
        this.#canvas.context.translate(
            -Math.floor(this.#config.drawOffset.xPix),
            -Math.floor(this.#config.drawOffset.yPix),
        )
    }

    setScale = (scale: number): void => {
        this.#canvas.context.scale(scale, scale)
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
            this.#canvas.context.lineWidth = 2
            this.#canvas.context.strokeRect(
                Math.ceil(data.dx),
                Math.ceil(data.dy),
                Math.ceil(data.dw),
                Math.ceil(data.dh),
            )
        }
    }

    configureStyle = (data: Map<string, number | string>): void => {
        for (const [key, value] of data) {
            this.#canvas.context[key] = value
        }
    }

    getWrappedText = (text: string, maxWidth: number): { wrappedText: string[]; width: number; height: number } => {
        let height = 0
        const wrappedText = []

        const lines = text.split('\n')

        for (const line of lines) {
            let currentLine = ''
            const words = line.split(' ')
            for (let i = 0; i < words.length; i++) {
                const dimensions = this.#canvas.context.measureText(currentLine + words[i] + ' ')
                if (dimensions.width > maxWidth) {
                    wrappedText.push(currentLine)
                    currentLine = words[i] + ' '
                } else {
                    currentLine += words[i] + ' '
                }
                if (i === words.length - 1) {
                    wrappedText.push(currentLine)
                }
                if (dimensions.fontBoundingBoxAscent + dimensions.fontBoundingBoxDescent > height)
                    height = Math.ceil(dimensions.fontBoundingBoxAscent + dimensions.fontBoundingBoxDescent)
            }
        }

        return {
            wrappedText,
            width: maxWidth,
            height,
        }
    }

    drawText = (text: string, xPix: number, yPix: number): void => {
        this.#canvas.context.fillText(text, xPix, yPix)
    }

    drawPath = (path: Path2D, fill: boolean = true): void => {
        if (fill) this.#canvas.context.fill(path)
        this.#canvas.context.stroke(path)
    }
}

export default Renderer
