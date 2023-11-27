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
    gameName: string
    xMax: number
    yMax: number
    xPixUnit: number
    yPixUnit: number
    layers: object[]
    tilesets: object[]
}

const handleLayer = (tileMaps: Map<number, OffscreenTileMap>, layer: object): void => {
    const zIndex = layer?.properties?.find(property => property.name === 'zIndex').value ?? -1
    if (!Object.hasOwn(tileMaps, zIndex)) {
        tileMaps[zIndex] = {
            zIndex,
            layers: [layer],
        }
    } else {
        tileMaps[zIndex].layers.push(layer)
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

const handleTileSets = async (gameName:string, tileSetAggregate: AggregateTileSet, tileSets: object[]): Promise<void> => {
    for (const tileSet of tileSets) {
        const name = tileSet.name.split('.')[0]
        const tileSetObj = await TileSetFactory.create({
            gameName,
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
    await handleTileSets(level.gameName, tileSet, level.tilesets)

    const layers = handleLayers({}, level.layers)
    const offScreenRenderer = new OffscreenRenderer()
    const tileMaps = new Map()
    for(const zIndex in layers) {
        tileMaps.set(zIndex, new OffscreenTileMap(offScreenRenderer, helper, tileSet, layers[zIndex]))
    }

    return new Level({
        tileMaps,
        tileSet,
        helper,
    })
}

export default { create }
