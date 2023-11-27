import TileMap from './TileMap.class'
import MapRenderer from '../graphics/MapRenderer.class'
import { RectCoordinates } from '../types/RectCoordinates.type'
import LevelHelper from './LevelHelper.class'
import AggregateTileSet from '../tilesets/AggregateTileSet.class'

class LiveTileMap extends TileMap {
    #drawTile = (data: {
        renderer: MapRenderer
        helper: LevelHelper
        tileSet: AggregateTileSet
        gid: number
        x: number
        y: number
        isDebug: boolean
    }): void => {
        if (data.gid === 0) return

        const source = data.tileSet.getSource(data.gid)
        if (source === undefined) return

        const destination = {
            dx: data.x * data.helper.pixelConfig.xPixUnit,
            dy: data.y * data.helper.pixelConfig.yPixUnit,
            dw: data.helper.pixelConfig.xPixUnit,
            dh: data.helper.pixelConfig.yPixUnit,
        }

        data.renderer.drawImage({ ...source, ...destination }, data.isDebug)
    }

    drawTileMap = (data: {
        renderer: MapRenderer
        helper: LevelHelper
        tileSet: AggregateTileSet
        isDebug: boolean
    }): void => {
        const viewport = data.renderer.getCurrentViewport()
        const topLeft = data.helper.pixToTile(viewport.xPix0, viewport.yPix0)
        const bottomRight = data.helper.pixToTile(viewport.xPix1, viewport.yPix1)
        const x0 = Math.max(0, topLeft.x - 1)
        const y0 = Math.max(0, topLeft.y - 1)
        const x1 = Math.min(data.helper.tileConfig.xMax, bottomRight.x + 1)
        const y1 = Math.min(data.helper.tileConfig.count / data.helper.tileConfig.xMax, bottomRight.y + 1)
        for (const layer of this.layers) {
            for (let i = x0; i < x1; i++) {
                for (let j = y0; j < y1; j++) {
                    const index = data.helper.tileToIndex(i, j)
                    if (layer.data[index] !== 0)
                        this.#drawTile({
                            renderer: data.renderer,
                            helper: data.helper,
                            tileSet: data.tileSet,
                            gid: layer.data[index],
                            x: i,
                            y: j,
                            isDebug: data.isDebug,
                        })
                }
            }
        }
    }
}

export default LiveTileMap
