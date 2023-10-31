import type Renderer from '../classes/Renderer.class'

type Direction = 'up' | 'down' | 'left' | 'right'

class Actor {
    #defaultDirection: Direction

    constructor() {
        this.#defaultDirection = 'down'
    }

    set defaultDirection(direction: Direction) {
        this.#defaultDirection = direction
    }

    get defaultDirection(): Direction {
        return this.#defaultDirection
    }

    draw(renderer: Renderer): void {
        throw new Error('Override `draw` in ' + this.constructor.name)
    }
}

export default Actor
