import type GameBuilder from './Game.builder'

class GameCommand {
    protected game: GameBuilder
    #isRunning: boolean
    #oldTime: number
    #fpsInterval: number

    constructor(game: GameBuilder) {
        this.game = game
        this.#isRunning = false
        this.#oldTime = 0
        this.#fpsInterval = 1000 / this.game.config.fps
    }

    #loop = (newTime): void => {
        if (!this.#isRunning) {
            return undefined
        }
        window.requestAnimationFrame(this.#loop)

        const elapsed = newTime - this.#oldTime
        if (elapsed <= this.#fpsInterval) return undefined
        this.render()
    }

    render = (): void => {
        throw new Error('Override `#render` in ' + this.constructor.name)
    }

    start = (): void => {
        this.#isRunning = true
        const startTime = window.performance.now()
        this.#loop(startTime)
    }

    stop = (): void => {}
}

export default GameCommand
