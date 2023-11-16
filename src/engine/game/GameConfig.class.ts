class GameConfig {
    #scale: number = 1
    #fps: number = 30

    set fps(fps: number) {
        this.#fps = fps
    }

    get fps(): number {
        return this.#fps
    }

    set scale(scale: number) {
        this.#scale = scale
    }

    get scale(): number {
        return this.#scale
    }
}

export default GameConfig
