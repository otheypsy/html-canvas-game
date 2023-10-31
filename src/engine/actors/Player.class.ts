import MapMovable from '../abstract/MapMovable.class.js'

import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type Renderer from '../classes/Renderer.class'
import type { PixelConfig } from '../types/PixelConfig.type'

interface PlayerContructor {
    tileSet: AggregateTileSet
    pixelConfig: PixelConfig
}

class Player extends MapMovable {
    readonly #tileSet: AggregateTileSet
    readonly #pixelConfig: PixelConfig

    constructor(player: PlayerContructor) {
        super()
        this.#tileSet = player.tileSet
        this.#pixelConfig = player.pixelConfig
    }

    draw(renderer: Renderer, mapOffset: { xPix: number; yPix: number }): void {
        const source = this.#tileSet.getSource(1)
        if (source === undefined) return

        const destination = {
            dx: this.mapPixPos.xPix - mapOffset.xPix,
            dy: this.mapPixPos.yPix - mapOffset.yPix,
            dw: this.#pixelConfig.xPixUnit,
            dh: this.#pixelConfig.yPixUnit,
        }

        renderer.saveContext()
        renderer.drawImage({ ...source, ...destination })
        renderer.restoreContext()
    }
}

export default Player
