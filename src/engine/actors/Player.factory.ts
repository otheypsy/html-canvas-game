import Player from './Player.class'
import AggregateTileSet from '../tilesets/AggregateTileSet.class'
import TileSetFactory from '../tilesets/TileSet.factory'

import type { PixelPosition } from '../types/PixelPosition'

interface CreatePlayer {
    tilesets: object[]
    xPixUnit: number
    yPixUnit: number
}

const handleTileSets = async (tileSetAggregate: AggregateTileSet, tileSets: object[]): Promise<void> => {
    for (const tileSet of tileSets) {
        const tileSetObj = await TileSetFactory.create({
            folderName: tileSet.folderName,
            fileName: tileSet.fileName,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (player: CreatePlayer): Promise<Player> => {
    const pixelConfig = {
        xPixUnit: player.xPixUnit,
        yPixUnit: player.yPixUnit,
    }

    const tileSetAggregate = new AggregateTileSet()
    await handleTileSets(tileSetAggregate, player.tilesets)
    return new Player({
        tileSet: tileSetAggregate,
        pixelConfig,
    })
}

export default { create }
