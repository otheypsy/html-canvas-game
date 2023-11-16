import type Renderer from '../graphics/MapRenderer.class'
import MapMovable from './MapMovable.class'

class Actor extends MapMovable {
    #type: string

    constructor() {
        super()
        this.#type = 'abstract'
    }

    set type(type: string) {
        this.#type = type
    }

    get type(): string {
        return this.#type
    }

    draw(renderer: Renderer): void {
        throw new Error('Override `draw` in ' + this.constructor.name)
    }
}

export default Actor
