import Directions from '../abstract/Directions.static'

class Touchscreen {
    readonly #touches: object

    constructor(element: HTMLElement) {
        this.#touches = {}
        this.#initDirections()
        this.#registerTouchStartEvents(element)
        this.#registerTouchEndEvents(element)
        this.#registerTouchMoveEvents(element)
    }

    #initDirections = (): void => {
        for (const direction in Directions) {
            this.#touches[Directions[direction].label] = {
                active: false,
            }
        }
    }

    #setRelativeDirections = (element: HTMLElement, xPix: number, yPix: number): void => {
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

    #registerTouchStartEvents = (element: HTMLElement): void => {
        window.addEventListener('touchstart', (e) => {
            e.preventDefault()
            if (e.target === element) {
                this.#initDirections()
                const { clientX, clientY } = e.touches[0]
                this.#setRelativeDirections(element, clientX, clientY)
            }
        })
    }

    #registerTouchEndEvents = (): void => {
        window.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.#initDirections()
        })
    }

    #registerTouchMoveEvents = (element: HTMLElement): void => {
        window.addEventListener('touchmove', (e) => {
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
