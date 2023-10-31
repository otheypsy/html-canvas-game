import TileSet from './TileSet.class'

import type { PixelConfig } from '../types/PixelConfig.type'
import type { TileConfig } from '../types/TileConfig.type'

interface CreateTileSet {
    folderName: string
    fileName: string
    startId: number
}

const loadImage = async (url): Promise<HTMLImageElement> => {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
}

const create = async (tileSet: CreateTileSet): Promise<TileSet> => {
    const relativeImgPath = '../../data/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.png'
    const imgUrl = new URL(relativeImgPath, import.meta.url).href
    const image = await loadImage(imgUrl)
    const config = await import(
        /* @vite-ignore */ '../../data/tilesets/' + tileSet.folderName + '/' + tileSet.fileName + '.tileset.json'
    )

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
