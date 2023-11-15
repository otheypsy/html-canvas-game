import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { PixelPosition } from '../types/PixelPosition'
import type MapRenderer from '../graphics/MapRenderer.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type { TilePosition } from '../types/TilePosition.type'
import type { TileConfig } from '../types/TileConfig.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface LevelConstructor {
    tileMaps: object
    tileSet: AggregateTileSet
    pixelConfig: PixelConfig
    tileConfig: TileConfig
}

class Level {
    readonly #tileMaps: object
    readonly #tileSet: AggregateTileSet
    readonly #pixelConfig: PixelConfig
    readonly #tileConfig: TileConfig

    constructor(level: LevelConstructor) {
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

    #drawLayer = (renderer: MapRenderer, layerLabel: string, isDebug: boolean = false): void => {
        const test = renderer.getCurrentViewport()
        const topLeft = this.pixToTile(test.xPix0, test.yPix0)
        const bottomRight = this.pixToTile(test.xPix1, test.yPix1)
        const x0 = Math.max(0, topLeft.x - 2)
        const y0 = Math.max(0, topLeft.y - 2)
        const x1 = Math.min(this.#tileConfig.xMax, bottomRight.x + 2)
        const y1 = Math.min(this.#tileConfig.count / this.#tileConfig.xMax, bottomRight.y + 2)
        for (const layer of this.#tileMaps[layerLabel].tileMap) {
            for (let i = x0; i < x1; i++) {
                for (let j = y0; j < y1; j++) {
                    const index = this.tileToIndex(i, j)
                    if (layer.data[index] !== 0) this.#drawTile(renderer, layer.data[index], i, j, isDebug)
                }
            }
        }
    }

    getTileMaps = (type: string): string[][] => {
        return this.#tileMaps[type]?.tileMap
    }

    getTileRect = (x, y): RectCoordinates => {
        return {
            xPix0: x * this.#pixelConfig.xPixUnit,
            yPix0: y * this.#pixelConfig.yPixUnit,
            xPix1: x * this.#pixelConfig.xPixUnit + this.#pixelConfig.xPixUnit,
            yPix1: y * this.#pixelConfig.yPixUnit + this.#pixelConfig.xPixUnit,
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

    drawBackground = (renderer: MapRenderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'background', isDebug)
    }

    drawForeground = (renderer: MapRenderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'foreground', isDebug)
    }

    drawCollisions = (renderer: MapRenderer, isDebug: boolean = false): void => {
        this.#drawLayer(renderer, 'collisions', isDebug)
    }
}

export default Level
