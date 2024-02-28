import type { TileLayer } from "../types/TileLayer.type"

class TileMap {
    readonly layers: TileLayer[] = []

    constructor(layers: TileLayer[]) {
        for (const layer of layers) {
            this.#addLayer(layer)
        }
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

    drawTileMap = (data: unknown): void => {}

}
export default TileMap
