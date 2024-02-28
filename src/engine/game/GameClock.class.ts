class GameClock {
    readonly #interval: number = 0
    #instance: number = 0

    constructor(interval: number = 10) {
        this.#interval = interval
    }

    start = (fn: () => void): void => {
        this.stop()
        this.#instance = window.setInterval(fn, this.#interval)
    }

    stop = (): void => {
        window.clearInterval(this.#instance);
    }

}

export default GameClock