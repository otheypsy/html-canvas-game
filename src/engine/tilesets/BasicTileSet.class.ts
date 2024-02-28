import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { TileConfig } from '../types/TileConfig.type'
import type { DrawImageSource } from '../types/DrawImageSource.type'
import type { TileSet } from '../types/TileSet.type'

interface TileSetConstructor {
    image: HTMLImageElement
    tileConfig: TileConfig
    pixelConfig: PixelConfig
}

class BasicTileSet implements TileSet {
    readonly #image: HTMLImageElement
    readonly #tileConfig: TileConfig
    readonly #pixelConfig: PixelConfig

    constructor(tileSet: TileSetConstructor) {
        this.#image = tileSet.image
        this.#tileConfig = tileSet.tileConfig
        this.#pixelConfig = tileSet.pixelConfig
    }

    getTileConfig(): TileConfig {
        return this.#tileConfig
    }

    getSource = (gid: number): DrawImageSource => {
        const [spriteY, spriteX] = divMod(gid - this.#tileConfig.startId, this.#tileConfig.xMax)

        const sx = spriteX * this.#pixelConfig.xPixUnit
        const sy = spriteY * this.#pixelConfig.yPixUnit
        const sw = this.#pixelConfig.xPixUnit
        const sh = this.#pixelConfig.yPixUnit

        return { img: this.#image, sx, sy, sw, sh }
    }
}

export default BasicTileSet
