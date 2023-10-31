import Sprite from '../abstract/Sprite.class'
import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { PixelPosition } from '../types/PixelPosition'
import type { TilePosition } from '../types/TilePosition.type'
import type { TileConfig } from '../types/TileConfig.type'
import { DrawImageSource } from '../types/DrawImageSource.type'

interface TileSetConstructor {
    image: HTMLImageElement
    tileConfig: TileConfig
    pixelConfig: PixelConfig
}

class TileSet extends Sprite {
    readonly #tileConfig: TileConfig
    readonly #pixelConfig: PixelConfig

    constructor(tileSet: TileSetConstructor) {
        super(tileSet.image)
        this.#tileConfig = tileSet.tileConfig
        this.#pixelConfig = tileSet.pixelConfig
    }

    get tileConfig(): TileConfig {
        return this.#tileConfig
    }

    getSource = (gid: number): DrawImageSource => {
        const [spriteY, spriteX] = divMod(gid - this.#tileConfig.startId, this.#tileConfig.xMax)

        const sx = spriteX * this.#pixelConfig.xPixUnit
        const sy = spriteY * this.#pixelConfig.yPixUnit
        const sw = this.#pixelConfig.xPixUnit
        const sh = this.#pixelConfig.yPixUnit

        return { img: this.image, sx, sy, sw, sh }
    }
}

export default TileSet
