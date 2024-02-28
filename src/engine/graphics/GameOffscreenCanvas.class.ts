class GameOffscreenCanvas {
    readonly #element: OffscreenCanvas
    readonly #context: OffscreenCanvasRenderingContext2D

    constructor(width: number, height: number) {
        this.#element = new OffscreenCanvas(width, height)
        this.#context = this.#element.getContext('2d', { alpha: true }) as OffscreenCanvasRenderingContext2D
    }

    get element(): OffscreenCanvas {
        return this.#element
    }

    get context(): OffscreenCanvasRenderingContext2D {
        return this.#context
    }
}

export default GameOffscreenCanvas
