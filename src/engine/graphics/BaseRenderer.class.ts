import type GameCanvas from './GameCanvas.class'
import type GameConfig from '../game/GameConfig.class'

interface BaseRendererConstructor {
    config: GameConfig
    canvas: GameCanvas
}

class BaseRenderer {
    readonly #canvas: GameCanvas

    constructor(data: BaseRendererConstructor) {
        this.#canvas = data.canvas
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

    configureStyle = (data: Record<string, number | string>): void => {
        for(const key of Object.keys(data)) {
            this.#canvas.context[key] = data[key]
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

export default BaseRenderer
