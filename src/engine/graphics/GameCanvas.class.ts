import type { PixelPosition } from '../types/PixelPosition'

const style = {
    border: '2px solid gray',
    display: 'block',
    margin: 'auto',
    pad: 5,
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

    readonly #initStyle = (element: HTMLElement, container: HTMLElement): void => {
        element.style.border = style.border
        element.style.display = style.display
        element.style.margin = style.margin
        console.log(container)
        element.width = container.clientWidth - style.pad
        element.height = container.clientHeight - style.pad
        element.style.imageRendering = 'pixelated'
    }

    readonly #initCanvas = (canvas: HTMLElement, container: HTMLElement): CanvasRenderingContext2D => {
        container.append(canvas)
        const context = canvas.getContext('2d', { alpha: false })
        context.imageSmoothingEnabled = false
        context.mozImageSmoothingEnabled = false
        context.oImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
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
