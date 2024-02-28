import Directions from '../abstract/Directions.static'

class Touchscreen {
    readonly #touches: object

    constructor(element: HTMLCanvasElement) {
        this.#touches = {}
        this.#initDirections()
        this.#registerTouchStartEvents(element)
        this.#registerTouchEndEvents(element)
        this.#registerTouchMoveEvents(element)
    }

    readonly #initDirections = (): void => {
        for (const direction in Directions) {
            this.#touches[Directions[direction].label] = {
                active: false,
            }
        }
    }

    readonly #setRelativeDirections = (element: HTMLCanvasElement, xPix: number, yPix: number): void => {
        if (xPix > element.width * 0.75) {
            this.#touches[Directions.RIGHT.label].active = true
        }
        if (xPix < element.width * 0.25) {
            this.#touches[Directions.LEFT.label].active = true
        }
        if (yPix > element.width * 0.75) {
            this.#touches[Directions.DOWN.label].active = true
        }
        if (yPix < element.width * 0.25) {
            this.#touches[Directions.UP.label].active = true
        }
    }

    readonly #registerTouchStartEvents = (element: HTMLCanvasElement): void => {
        element.addEventListener('touchstart', (e) => {
            e.preventDefault()
            if (e.target === element) {
                this.#initDirections()
                const { clientX, clientY } = e.touches[0]
                this.#setRelativeDirections(element, clientX, clientY)
            }
        })
    }

    readonly #registerTouchEndEvents = (element: HTMLCanvasElement): void => {
        element.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.#initDirections()
        })
    }

    readonly #registerTouchMoveEvents = (element: HTMLCanvasElement): void => {
        element.addEventListener('touchmove', (e) => {
            e.preventDefault()
            if (e.target === element) {
                this.#initDirections()
                const { clientX, clientY } = e.touches[0]
                this.#setRelativeDirections(element, clientX, clientY)
            }
        })
    }

    get touches(): object {
        return this.#touches
    }
}

export default Touchscreen
