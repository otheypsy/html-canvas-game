import Level from './Level.class'
import TileMap from './TileMap.class'
import AggregateTileSet from '../tilesets/AggregateTileSet.class'
import TileSetFactory from '../tilesets/TileSet.factory'

import type { TilePosition } from '../types/TilePosition.type'
import type GameConfig from '../game/GameConfig.class'

export interface CreateLevel {
    config: GameConfig
    xMax: number
    yMax: number
    xPixUnit: number
    yPixUnit: number
    start: TilePosition
    layers: object[]
    tilesets: object[]
}

const handleLayer = (tileMaps: object, layer: object): void => {
    const category = layer?.properties?.find((property) => property.name === 'category').value
    switch (category) {
        case 'collisions': {
            tileMaps.collisions.addLayer(layer)
            break
        }
        case 'foreground': {
            tileMaps.foreground.addLayer(layer)
            break
        }
        default: {
            tileMaps.background.addLayer(layer)
            break
        }
    }
}

const handleLayers = (tileMaps: object, layers: object[]): void => {
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
    const tileMaps = {
        collisions: new TileMap({ xMax, yMax }),
        foreground: new TileMap({ xMax, yMax }),
        background: new TileMap({ xMax, yMax }),
    }
    handleLayers(tileMaps, level.layers)

    const tileSetAggregate = new AggregateTileSet()
    await handleTileSets(tileSetAggregate, level.tilesets)

    return new Level({
        config: level.config,
        tileMaps,
        tileSet: tileSetAggregate,
        pixelConfig,
        tileConfig,
    })
}

export default { create }
