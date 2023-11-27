class TileMap {
    readonly layers = []

    constructor(tileMap: object) {
        for (const layer of tileMap.layers) {
            this.addLayer(layer)
        }
    }

    addLayer = (layer): void => {
        this.layers.push({
            id: layer.id,
            name: layer.name,
            visible: layer.visible,
            opacity: layer.opacity,
            data: layer.data,
        })
    }
}
export default TileMap
