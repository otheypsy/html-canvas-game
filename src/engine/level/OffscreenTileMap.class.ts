import TileMap from './TileMap.class'
import GameOffscreenCanvas from '../graphics/GameOffscreenCanvas.class'

import type OffscreenRenderer from '../graphics/OffScreenRenderer.class'
import type MapRenderer from '../graphics/MapRenderer.class'
import type LevelHelper from './LevelHelper.class'
import type AggregateTileSet from '../tilesets/AggregateTileSet.class'

class OffscreenTileMap extends TileMap {
    readonly #offscreenCanvas: GameOffscreenCanvas

    constructor(
        renderer: OffscreenRenderer,
        helper: LevelHelper,
        tileSet: AggregateTileSet,
        tileMap: object,
        isDebug?: boolean,
    ) {
        super(tileMap)
        const width = helper.tileConfig.xMax * helper.pixelConfig.xPixUnit
        const height = (helper.tileConfig.count / helper.tileConfig.xMax) * helper.pixelConfig.yPixUnit
        this.#offscreenCanvas = new GameOffscreenCanvas(width, height)
        this.#initializeCanvasImage(renderer, helper, tileSet, isDebug ?? false)
    }

    readonly #drawTile = (data: {
        renderer: OffscreenRenderer
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

        data.renderer.drawImage(this.#offscreenCanvas, { ...source, ...destination }, data.isDebug)
    }

    readonly #initializeCanvasImage = (
        renderer: OffscreenRenderer,
        helper: LevelHelper,
        tileSet: AggregateTileSet,
        isDebug: boolean = false,
    ): void => {
        for (const layer of this.layers) {
            this.#offscreenCanvas.context.save()
            this.#offscreenCanvas.context.globalAlpha = layer.opacity
            for (const index in layer.data) {
                const { x, y } = helper.indexToTile(index)
                this.#drawTile({
                    renderer,
                    helper,
                    tileSet,
                    gid: layer.data[index],
                    x,
                    y,
                    isDebug,
                })
            }
            this.#offscreenCanvas.context.restore()
        }
    }

    drawTileMap = (data: { renderer: MapRenderer}): void => {
        const viewport = data.renderer.getCurrentViewport()
        const xPix0 = Math.max(0, viewport.xPix0)
        const yPix0 = Math.max(0, viewport.yPix0)
        const xPix1 = Math.min(this.#offscreenCanvas.element.width, viewport.xPix1)
        const yPix1 = Math.min(this.#offscreenCanvas.element.height, viewport.yPix1)
        data.renderer.drawImage(
            {
                img: this.#offscreenCanvas.element,
                sx: xPix0,
                sy: yPix0,
                sw: xPix1 - xPix0,
                sh: yPix1 - yPix0,
                dx: xPix0,
                dy: yPix0,
                dw: xPix1 - xPix0,
                dh: yPix1 - yPix0,
            },
            false,
        )
    }
}

export default OffscreenTileMap
