import BasicTileSet from '../../engine/tilesets/BasicTileSet.class'
import { loadImage, loadJSON } from '../services/App.services'

import type { PixelConfig } from '../../engine/types/PixelConfig.type'
import type { TileConfig } from '../../engine/types/TileConfig.type'

interface CreateTileSet {
    gameName: string
    folderName: string
    fileName: string
    startId: number
}

const create = async (tileSet: CreateTileSet): Promise<BasicTileSet> => {
    const relativeImgPath = '/assets/' + tileSet.gameName + '/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.png'
    const imgUrl = new URL(relativeImgPath, import.meta.url).href
    const image = await loadImage(imgUrl)
    const config = await loadJSON('/assets/' + tileSet.gameName + '/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.json')

    const tileConfig: TileConfig = {
        xMax: config.columns,
        count: config.tilecount,
        startId: tileSet.startId,
    }

    const pixelConfig: PixelConfig = {
        xPixUnit: config.tilewidth,
        yPixUnit: config.tileheight,
    }

    return new BasicTileSet({
        image,
        tileConfig,
        pixelConfig,
    })
}
export default { create }
