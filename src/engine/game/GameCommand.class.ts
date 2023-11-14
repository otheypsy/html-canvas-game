class GameCommand {
    #isRunning: boolean
    #oldTime: number
    #fpsInterval: number

    constructor(fps: number) {
        this.#isRunning = false
        this.#oldTime = 0
        this.#fpsInterval = 1000 / fps
    }

    #loop = (newTime): void => {
        if (!this.#isRunning) return undefined
        window.requestAnimationFrame(this.#loop)

        const elapsed = newTime - this.#oldTime
        if (elapsed <= this.#fpsInterval) return undefined
        this.step()
    }

    initialize = (): void => {}

    step = (): void => {
        throw new Error('Override `#step` in ' + this.constructor.name)
    }

    start = (): void => {
        this.#isRunning = true
        const startTime = window.performance.now()
        this.#loop(startTime)
    }

    pause = (): void => {
        this.#isRunning = false
    }
}

export default GameCommand
