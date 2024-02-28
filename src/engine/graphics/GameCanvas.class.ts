import type { PixelPosition } from '../types/PixelPosition'

const style = {
    border: '2px solid gray',
    display: 'block',
    pad: 10,
}

class GameCanvas {
    readonly element: HTMLCanvasElement
    readonly context: CanvasRenderingContext2D
    readonly center: PixelPosition

    constructor(container: HTMLElement, scale: number = 1) {
        const element = document.createElement('canvas')
        this.#initStyle(element, container, scale)
        this.context = this.#initCanvas(element, container)
        this.element = element
        this.center = {
            xPix: this.element.width / 2,
            yPix: this.element.height / 2,
        }
    }

    readonly #initStyle = (element: HTMLCanvasElement, container: HTMLElement, scale: number = 1): void => {
        element.width = container.clientWidth - style.pad - ((container.clientWidth - style.pad) % (2 * scale))
        element.height = container.clientHeight - (container.clientHeight % (2 * scale))
        element.style.border = style.border
        element.style.display = style.display
        element.style.margin = style.pad / 2 + 'px auto'
        element.style.imageRendering = 'pixelated'
    }

    readonly #initCanvas = (canvas: HTMLCanvasElement, container: HTMLElement): CanvasRenderingContext2D => {
        container.append(canvas)
        const context = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D
        context.imageSmoothingEnabled = false
        context.mozImageSmoothingEnabled = false
        context.oImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        return context
    }
}

export default GameCanvas
