import type { PixelConfig } from '../types/PixelConfig.type'
import type MapRenderer from '../graphics/MapRenderer.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type { TileConfig } from '../types/TileConfig.type'
import LevelHelper from './LevelHelper.class'
import TileMap from './TileMap.class'
import OffscreenTileMap from './OffscreenTileMap.class'
import LiveTileMap from './LiveTileMap.class'

interface LevelConstructor {
    tileMaps: {
        background: LiveTileMap | OffscreenTileMap
        foreground: LiveTileMap | OffscreenTileMap
        collisions: LiveTileMap | OffscreenTileMap
    }
    tileSet: AggregateTileSet
    helper: LevelHelper
}

class Level {
    readonly #tileMaps: object
    readonly #tileSet: AggregateTileSet
    readonly helper: LevelHelper

    constructor(level: LevelConstructor) {
        this.#tileMaps = level.tileMaps
        this.#tileSet = level.tileSet
        this.helper = level.helper
    }

    getTileMap = (type: string): LiveTileMap | OffscreenTileMap => {
        return this.#tileMaps[type]
    }

    getTileSet = (): AggregateTileSet => {
        return this.#tileSet
    }

    drawBackground = (renderer: MapRenderer): void => {
        this.#tileMaps?.background.drawTileMap(renderer)
    }

    drawForeground = (renderer: MapRenderer): void => {
        this.#tileMaps?.foreground.drawTileMap(renderer)
    }

    drawCollisions = (renderer: MapRenderer): void => {
        this.#tileMaps?.collisions.drawTileMap(renderer)
    }
}

export default Level
