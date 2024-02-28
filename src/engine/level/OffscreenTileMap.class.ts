import GameOffscreenCanvas from '../graphics/GameOffscreenCanvas.class'
import OffscreenRenderer from '../graphics/OffScreenRenderer.class'

import type MapRenderer from '../graphics/MapRenderer.class'
import type LevelHelper from './LevelHelper.class'
import type { TileLayer } from '../types/TileLayer.type'
import type { TileSet } from '../types/TileSet.type'

class OffscreenTileMap {
    readonly #offscreenCanvas: GameOffscreenCanvas
    readonly layers: TileLayer[] = []

    constructor(
        helper: LevelHelper,
        tileSet: TileSet,
        layers: TileLayer[],
        isDebug?: boolean,
    ) {
        for (const layer of layers) {
            this.#addLayer(layer)
        }
        const renderer = new OffscreenRenderer()
        const width = helper.tileConfig.xMax * helper.pixelConfig.xPixUnit
        const height = (helper.tileConfig.count / helper.tileConfig.xMax) * helper.pixelConfig.yPixUnit
        this.#offscreenCanvas = new GameOffscreenCanvas(width, height)
        this.#initializeCanvasImage(renderer, helper, tileSet, isDebug ?? false)
    }

    readonly #addLayer = (layer: TileLayer): void => {
        this.layers.push({
            id: layer.id,
            name: layer.name,
            visible: layer.visible,
            opacity: layer.opacity,
            data: layer.data
        })
    }

    readonly #drawTile = (data: {
        renderer: OffscreenRenderer
        helper: LevelHelper
        tileSet: TileSet,
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
        tileSet: TileSet,
        isDebug: boolean = false,
    ): void => {
        for (const layer of this.layers) {
            this.#offscreenCanvas.context.save()
            this.#offscreenCanvas.context.globalAlpha = layer.opacity
            layer.data.forEach((gid: number, index: number) => {
                const { x, y } = helper.indexToTile(index)
                this.#drawTile({
                    renderer,
                    helper,
                    tileSet,
                    gid,
                    x,
                    y,
                    isDebug,
                })
            })
            this.#offscreenCanvas.context.restore()
        }
    }

    drawTileMap = (data: { 
        renderer: MapRenderer 
    }): void => {
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
