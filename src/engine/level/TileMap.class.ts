interface TileMapConstructor {
    xMax: number
    yMax: number
}

class TileMap {
    readonly #tileMap = []
    readonly #xMax: number
    readonly #yMax: number

    constructor(tileMap: TileMapConstructor) {
        this.#xMax = tileMap.xMax
        this.#yMax = tileMap.yMax
    }

    addLayer = (layer): void => {
        this.#tileMap.push({
            name: layer.name,
            data: layer.data,
        })
    }

    get tileMap(): object {
        return this.#tileMap
    }

    get xMax(): number {
        return this.#xMax
    }

    get yMax(): number {
        return this.#yMax
    }
}
export default TileMap
