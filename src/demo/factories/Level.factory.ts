import Level from '../../engine/level/Level.class'
import AggregateTileSet from '../../engine/tilesets/AggregateTileSet.class'
import LiveTileMap from '../../engine/level/LiveTileMap.class'
import LevelHelper from '../../engine/level/LevelHelper.class'
import TileSetFactory from './TileSet.factory'

import type { TilePosition } from '../../engine/types/TilePosition.type'
import OffscreenTileMap from '../../engine/level/OffscreenTileMap.class'
import TileMap from '../../engine/level/TileMap.class'
import OffscreenRenderer from '../../engine/graphics/OffScreenRenderer.class'

export interface CreateLevel {
    xMax: number
    yMax: number
    xPixUnit: number
    yPixUnit: number
    start: TilePosition
    layers: object[]
    tilesets: object[]
}

const handleLayer = (tileMaps: object, layer: object): void => {
    const category = layer?.properties?.find((property) => property.name === 'category').value ?? 'background'
    if (!Object.hasOwn(tileMaps, category)) {
        tileMaps[category] = {
            category,
            layers: [layer],
        }
    } else {
        tileMaps[category].layers.push(layer)
    }
}

const handleLayers = (tileMaps: object, layers: object[]): object => {
    for (const layer of layers) {
        switch (layer.type) {
            case 'group': {
                handleLayers(tileMaps, layer.layers)
                break
            }
            case 'tilelayer': {
                handleLayer(tileMaps, layer)
                break
            }
            default: {
                break
            }
        }
    }
    return tileMaps
}

const handleTileSets = async (tileSetAggregate: AggregateTileSet, tileSets: object[]): Promise<void> => {
    for (const tileSet of tileSets) {
        const name = tileSet.source.split('.')[0]
        const tileSetObj = await TileSetFactory.create({
            folderName: name,
            fileName: name,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (level: CreateLevel): Promise<Level> => {
    const xMax = level.xMax
    const yMax = level.yMax

    const pixelConfig = {
        xPixUnit: level.xPixUnit,
        yPixUnit: level.yPixUnit,
    }

    const tileConfig = {
        xMax,
        count: xMax * yMax,
        startId: 0,
    }

    const helper = new LevelHelper({ pixelConfig, tileConfig })
    const tileSet = new AggregateTileSet()
    await handleTileSets(tileSet, level.tilesets)

    const tileMapsTemp = handleLayers({}, level.layers)
    const offScreenRenderer = new OffscreenRenderer()
    const tileMaps = {
        collisions: new OffscreenTileMap(offScreenRenderer, helper, tileSet, tileMapsTemp.collisions),
        foreground: new OffscreenTileMap(offScreenRenderer, helper, tileSet, tileMapsTemp.foreground),
        background: new OffscreenTileMap(offScreenRenderer, helper, tileSet, tileMapsTemp.background),
    }

    return new Level({
        tileMaps,
        tileSet,
        helper,
    })
}

export default { create }
