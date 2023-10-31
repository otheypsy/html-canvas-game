import type TileSet from './TileSet.class'
import type { DrawImageSource } from '../types/DrawImageSource.type'

class AggregateTileSet {
    readonly #tileSets: TileSet[] = []
    addTileSet = (tileSet: TileSet): void => {
        this.#tileSets.push(tileSet)
    }

    getSource = (gid): DrawImageSource | undefined => {
        const tileSet = this.#tileSets.find((item) => {
            return gid < item.tileConfig.count + item.tileConfig.startId && gid >= item.tileConfig.startId
        })
        return tileSet?.getSource(gid)
    }
}

export default AggregateTileSet
