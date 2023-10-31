import MapMovable from '../abstract/MapMovable.class'
import { divMod } from '../utils/math.utils'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { PixelPosition } from '../types/PixelPosition'
import type Renderer from '../classes/Renderer.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import TileMap from './TileMap.class'
import Actor from '../abstract/Actor.class'

interface LevelConstructor {
    tileMaps: object
    tileSet: AggregateTileSet
    pixelConfig: PixelConfig
}

class Level extends MapMovable {
    readonly #tileMaps: object
    readonly #tileSet: AggregateTileSet
    readonly #pixelConfig: PixelConfig
    readonly #actors: MapMovable[]

    constructor(level: LevelConstructor) {
        super()
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.#pixelConfig = level.pixelConfig
        this.#actors = []
    }

    #drawTile = (renderer: Renderer, gid: number, x, y): void => {
        if (gid === 0) return

        const source = this.#tileSet.getSource(gid)
        if (source === undefined) return

        const destination = {
            dx: x * this.#pixelConfig.xPixUnit - this.mapPixPos.xPix,
            dy: y * this.#pixelConfig.yPixUnit - this.mapPixPos.yPix,
            dw: this.#pixelConfig.xPixUnit,
            dh: this.#pixelConfig.yPixUnit,
        }

        renderer.drawImage({ ...source, ...destination })
    }

    #drawLayer = (renderer: Renderer, layerLabel: string): void => {
        renderer.saveContext()
        for (const layer of this.#tileMaps[layerLabel].tileMap) {
            for (const index in layer.data) {
                if (layer.data[index] !== 0) {
                    const [y, x] = divMod(index, this.#tileMaps[layerLabel].xMax)
                    this.#drawTile(renderer, layer.data[index], x, y)
                }
            }
        }
        renderer.restoreContext()
    }

    #drawActor = (renderer: Renderer, actor: MapMovable): void => {
        actor.draw(renderer, this.mapPixPos)
    }

    tileToPix = (x, y): PixelPosition => {
        return {
            xPix: x * this.#pixelConfig.xPixUnit + this.#pixelConfig.xPixUnit / 2,
            yPix: y * this.#pixelConfig.yPixUnit + this.#pixelConfig.yPixUnit / 2,
        }
    }

    getTileMaps = (): object => {
        return this.#tileMaps
    }

    registerActor = (actor: MapMovable): void => {
        this.#actors.push(actor)
    }

    drawBackground = (renderer: Renderer): void => {
        this.#drawLayer(renderer, 'background')
    }

    drawForeground = (renderer: Renderer): void => {
        this.#drawLayer(renderer, 'foreground')
    }

    drawCollisions = (renderer: Renderer): void => {
        this.#drawLayer(renderer, 'collisions')
    }

    drawActors = (renderer: Renderer): void => {
        for (const actor of this.#actors) {
            this.#drawActor(renderer, actor)
        }
    }
}

export default Level
