import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { PixelPosition } from '../types/PixelPosition'
import type Renderer from '../graphics/Renderer.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type { TilePosition } from '../types/TilePosition.type'
import type { TileConfig } from '../types/TileConfig.type'
import type GameConfig from '../game/GameConfig.class'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface LevelConstructor {
    config: GameConfig
    tileMaps: object
    tileSet: AggregateTileSet
    pixelConfig: PixelConfig
    tileConfig: TileConfig
}

class Level {
    readonly #config: GameConfig
    readonly #tileMaps: object
    readonly #tileSet: AggregateTileSet
    readonly #pixelConfig: PixelConfig
    readonly #tileConfig: TileConfig

    constructor(level: LevelConstructor) {
        this.#config = level.config
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.#pixelConfig = level.pixelConfig
        this.#tileConfig = level.tileConfig
    }

    #drawTile = (renderer: Renderer, gid: number, x, y, isDebug: boolean = false): void => {
        if (gid === 0) return

        const source = this.#tileSet.getSource(gid)
        if (source === undefined) return

        const destination = {
            dx: x * this.#pixelConfig.xPixUnit,
            dy: y * this.#pixelConfig.yPixUnit,
            dw: this.#pixelConfig.xPixUnit,
            dh: this.#pixelConfig.yPixUnit,
        }

        renderer.drawImage({ ...source, ...destination }, isDebug)
    }

    #drawLayer = (renderer: Renderer, layerLabel: string, isDebug: boolean = false): void => {
        for (const layer of this.#tileMaps[layerLabel].tileMap) {
            for (const index in layer.data) {
                if (layer.data[index] !== 0) {
                    const { x, y } = this.indexToTile(index)
                    this.#drawTile(renderer, layer.data[index], x, y, isDebug)
                }
            }
        }
    }

    getTileMaps = (type: string): string[][] => {
        return this.#tileMaps[type]?.tileMap
    }

    getTileRect = (x, y): RectCoordinates => {
        return {
            x0: x * this.#pixelConfig.xPixUnit,
            y0: y * this.#pixelConfig.yPixUnit,
            x1: x * this.#pixelConfig.xPixUnit + this.#pixelConfig.xPixUnit,
            y1: y * this.#pixelConfig.yPixUnit + this.#pixelConfig.xPixUnit,
        }
    }

    indexToTile = (index): TilePosition => {
        const [y, x] = divMod(index, this.#tileConfig.xMax)
        return { x, y }
    }

    tileToIndex = (x, y): number => {
        return y * this.#tileConfig.xMax + x
    }

    tileToPix = (x, y): PixelPosition => {
        return {
            xPix: x * this.#pixelConfig.xPixUnit + this.#pixelConfig.xPixUnit / 2,
            yPix: y * this.#pixelConfig.yPixUnit + this.#pixelConfig.yPixUnit / 2,
        }
    }

    pixToTile = (xPix, yPix): TilePosition => {
        return {
            x: Math.floor(xPix / this.#pixelConfig.xPixUnit),
            y: Math.floor(yPix / this.#pixelConfig.yPixUnit),
        }
    }

    drawBackground = (renderer: Renderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'background', isDebug)
    }

    drawForeground = (renderer: Renderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'foreground', isDebug)
    }

    drawCollisions = (renderer: Renderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'collisions', isDebug)
    }
}

export default Level
