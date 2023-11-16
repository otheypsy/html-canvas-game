import type { PixelPosition } from '../types/PixelPosition'

const style = {
    border: '2px solid gray',
    display: 'block',
    margin: 'auto',
    pad: 12,
}
class GameCanvas {
    readonly #element: HTMLElement
    readonly #context: CanvasRenderingContext2D
    constructor(container: HTMLElement) {
        const element = document.createElement('canvas')
        this.#initStyle(element, container)
        this.#context = this.#initCanvas(element, container)
        this.#element = element
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
        context.fillStyle = '#6c757d'
        context.fillRect(0, 0, canvas.width, canvas.height)
        return context
    }

    get context(): CanvasRenderingContext2D {
        return this.#context
    }

    get element(): HTMLElement {
        return this.#element
    }

    get center(): PixelPosition {
        return {
            xPix: this.#element.width / 2,
            yPix: this.#element.height / 2,
        }
    }
}

export default GameCanvas
