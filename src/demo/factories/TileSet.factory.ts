import TileSet from '../../engine/tilesets/TileSet.class'

import type { PixelConfig } from '../../engine/types/PixelConfig.type'
import type { TileConfig } from '../../engine/types/TileConfig.type'

interface CreateTileSet {
    gameName: string
    folderName: string
    fileName: string
    startId: number
}

const loadImage = async (url: string): Promise<HTMLImageElement> => {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
}

const loadJSON = async (url: string): Promise<object> => {
    const response = await fetch(url)
    return response.json()
}

const create = async (tileSet: CreateTileSet): Promise<TileSet> => {
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

    return new TileSet({
        image,
        tileConfig,
        pixelConfig,
    })
}
export default { create }
