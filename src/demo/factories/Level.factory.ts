import Level from '../../engine/level/Level.class'
import AggregateTileSet from '../../engine/tilesets/AggregateTileSet.class'
import LiveTileMap from '../../engine/level/LiveTileMap.class'
import LevelHelper from '../../engine/level/LevelHelper.class'
import TileSetFactory from './TileSet.factory'
import OffscreenTileMap from '../../engine/level/OffscreenTileMap.class'

export interface CreateLevel {
    gameName: string
    xMax: number
    yMax: number
    xPixUnit: number
    yPixUnit: number
    layers: object[]
    tilesets: object[]
    isLive?: boolean
}

const handleLayer = (finalLayers: Record<number, object>, layer: object): void => {
    const zIndex = layer?.properties?.find(property => property.name === 'zIndex').value ?? -1
    if (!Object.hasOwn(finalLayers, zIndex)) {
        finalLayers[zIndex] = {
            zIndex,
            layers: [layer],
        }
    } else {
        finalLayers[zIndex].layers.push(layer)
    }
}

const handleLayers = (finalLayers: Record<number, object>, layers: object[]): object => {
    for (const layer of layers) {
        switch (layer.type) {
            case 'group': {
                handleLayers(finalLayers, layer.layers)
                break
            }
            case 'tilelayer': {
                handleLayer(finalLayers, layer)
                break
            }
            default: {
                break
            }
        }
    }
    return finalLayers
}

const sanitizeLayers = (layers: object[]): object => {
    const finalLayers: Record<number, object> = {}
    return handleLayers(finalLayers, layers)
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

    const layers = sanitizeLayers(level.layers)
    const tileMaps: Record<string, LiveTileMap | OffscreenTileMap> = {}
    for(const zIndex in layers) {
        const tileMap = (level?.isLive === true)
            ? new LiveTileMap(layers[zIndex].layers)
            : new OffscreenTileMap(helper, tileSet, layers[zIndex].layers)  
        tileMaps[zIndex] = tileMap
    }

    return new Level({
        tileMaps,
        tileSet,
        helper,
    })
}

export default { create }
