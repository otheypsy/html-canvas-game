import type { PixelPosition } from '../types/PixelPosition'

const style = {
    border: '2px solid gray',
    display: 'block',
    margin: 'auto',
    pad: 12,
}
class GameCanvas {
    readonly #canvas: HTMLElement
    readonly #context: CanvasRenderingContext2D
    constructor(container: HTMLElement) {
        const canvas = document.createElement('canvas')
        this.#initStyle(canvas, container)
        this.#context = this.#initCanvas(canvas, container)
        this.#canvas = canvas
    }

    #initStyle = (canvas: HTMLElement, container: HTMLElement): void => {
        canvas.style.border = style.border
        canvas.style.display = style.display
        canvas.style.margin = style.margin
        canvas.width = container.offsetWidth - style.pad
        canvas.height = container.offsetHeight - style.pad
        canvas.style.imageRendering = 'pixelated'
    }

    #initCanvas = (canvas: HTMLElement, container: HTMLElement): CanvasRenderingContext2D => {
        container.append(canvas)
        const context = canvas.getContext('2d')
        context.imageSmoothingEnabled = false
        context.mozImageSmoothingEnabled = false
        context.oImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)
        return context
    }

    get context(): CanvasRenderingContext2D {
        return this.#context
    }

    get center(): PixelPosition {
        return {
            xPix: this.#canvas.width / 2,
            yPix: this.#canvas.height / 2,
        }
    }
}

export default GameCanvas
