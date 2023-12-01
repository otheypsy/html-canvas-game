import FPSController from "./FPSController.class"
import GameClock from "./GameClock.class"

class GameCommand {
    readonly #fpsController: FPSController
    readonly #gameClock: GameClock
    #isRunning: boolean = false

    constructor(fps: number=0, logicIterval: number=10) {
        this.#isRunning = false
        this.#fpsController = new FPSController(fps)
        this.#gameClock = new GameClock(logicIterval)
    }

    readonly #logicLoop = (): void => {
        if (!this.#isRunning) return undefined
        this.#gameClock.start(this.logicStep)
    }

    readonly #drawLoop = (): void => {
        if (!this.#isRunning) return undefined
        window.requestAnimationFrame(this.#drawLoop)

        if(!this.#fpsController.check()) return undefined
        this.drawStep()
    }

    logicStep = (): void => {
        throw new Error('Override `logicStep` in ' + this.constructor.name)
    }

    drawStep = (): void => {
        throw new Error('Override `drawStep` in ' + this.constructor.name)
    }

    step = (): void => {
        this.logicStep()
        this.drawStep()
    }

    start = (): void => {
        this.#isRunning = true
        this.#logicLoop()
        this.#drawLoop()
    }

    stop = (): void => {
        this.#isRunning = false
        this.#gameClock.stop()
    }
}

export default GameCommand
