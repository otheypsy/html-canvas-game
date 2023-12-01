import type { PixelConfig } from '../types/PixelConfig.type'
import type MapRenderer from '../graphics/MapRenderer.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type { TileConfig } from '../types/TileConfig.type'
import LevelHelper from './LevelHelper.class'
import TileMap from './TileMap.class'
import OffscreenTileMap from './OffscreenTileMap.class'
import LiveTileMap from './LiveTileMap.class'

interface LevelConstructor {
    tileMaps: Map<string, LiveTileMap | OffscreenTileMap>
    tileSet: AggregateTileSet
    helper: LevelHelper
}

class Level {
    readonly #tileMaps: Map<string, LiveTileMap | OffscreenTileMap>
    readonly #tileSet: AggregateTileSet
    readonly helper: LevelHelper

    constructor(level: LevelConstructor) {
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.helper = level.helper
    }

    getTileMap = (zIndex: string): LiveTileMap | OffscreenTileMap | undefined => {
        return this.#tileMaps.get(zIndex)
    }

    getTileSet = (): AggregateTileSet => {
        return this.#tileSet
    }

    drawTileMap = (renderer: MapRenderer, zIndex:string, isDebug: boolean = false): void => {
        if(!this.#tileMaps.has(zIndex)) return
        this.#tileMaps.get(zIndex)?.drawTileMap({
            renderer,
            helper: this.helper,
            tileSet: this.#tileSet,
            isDebug
        })
    }
}

export default Level
