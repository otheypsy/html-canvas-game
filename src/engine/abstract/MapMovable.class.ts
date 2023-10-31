import type { PixelPosition } from '../types/PixelPosition'
import Actor from './Actor.class'
import Renderer from '../classes/Renderer.class'

class MapMovable extends Actor {
    protected mapPixPos: PixelPosition = {
        xPix: 0,
        yPix: 0,
    }

    setMapPixPos = (xPix, yPix): void => {
        this.mapPixPos = {
            xPix,
            yPix,
        }
    }

    getMapPixPos = (): PixelPosition => {
        return this.mapPixPos
    }

    draw(renderer: Renderer, mapOffset: PixelPosition = { xPix: 0, yPix: 0 }): void {
        throw new Error('Override `draw` in ' + this.constructor.name)
    }
}

export default MapMovable
