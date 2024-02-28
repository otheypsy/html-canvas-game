import type MapRenderer from '../graphics/MapRenderer.class'

import type LevelHelper from './LevelHelper.class'
import type LiveTileMap from './LiveTileMap.class'
import type OffscreenTileMap from './OffscreenTileMap.class'
import type { TileSet } from '../types/TileSet.type'

interface LevelConstructor {
    tileMaps: Record<string, LiveTileMap | OffscreenTileMap>
    tileSet: TileSet
    helper: LevelHelper
}

class Level {
    readonly #tileMaps: Record<string, LiveTileMap | OffscreenTileMap>
    readonly #tileSet: TileSet
    readonly helper: LevelHelper

    constructor(level: LevelConstructor) {
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.helper = level.helper
    }

    getTileMap = (zIndex: string): LiveTileMap | OffscreenTileMap | undefined => {
        return this.#tileMaps[zIndex]
    }

    getTileSet = (): TileSet => {
        return this.#tileSet
    }

    drawTileMap = (renderer: MapRenderer, zIndex:string, isDebug: boolean = false): void => {
        this.#tileMaps[zIndex]?.drawTileMap({
            renderer,
            helper: this.helper,
            tileSet: this.#tileSet,
            isDebug
        })
    }
}

export default Level
