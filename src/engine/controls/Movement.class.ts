import type MapMovable from '../abstract/MapMovable.class'
import type KeyboardControl from './KeyboardControl.class'

class Movement {
    #movables: MapMovable[]
    #keyboard: KeyboardControl

    constructor(keyboard: KeyboardControl) {
        this.#movables = []
        this.#keyboard = keyboard
    }

    addMovable = (movable: MapMovable): void => {
        this.#movables.push(movable)
    }

    move = (): void => {
        // console.log(1)
        for (const movable of this.#movables) {
            const pixelPosition = movable.getMapPixPos()
            movable.setMapPixPos(pixelPosition.xPix + 1, pixelPosition.yPix)
        }
    }
}

export default Movement
