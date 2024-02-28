import type BasicTileSet from './BasicTileSet.class'
import type { DrawImageSource } from '../types/DrawImageSource.type'
import type { TileSet } from '../types/TileSet.type'

class AggregateTileSet implements TileSet {
    readonly #tileSets: BasicTileSet[] = []
    addTileSet = (tileSet: BasicTileSet): void => {
        this.#tileSets.push(tileSet)
    }

    getSource = (gid: number): DrawImageSource | undefined => {
        const tileSet = this.#tileSets.find((item) => {
            return gid < item.getTileConfig().count + item.getTileConfig().startId && gid >= item.getTileConfig().startId
        })
        return tileSet?.getSource(gid)
    }
}

export default AggregateTileSet
