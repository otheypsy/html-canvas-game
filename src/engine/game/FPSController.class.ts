class FPSController {
    #oldTime: number = 0
    readonly #fpsInterval: number = 0

    constructor(fps: number) {
        this.#oldTime = window.performance.now()
        this.#fpsInterval = (fps === 0) ? 1 : 1000 / fps
    }

    check = (): boolean => {
        const newTime = window.performance.now()
        const elapsed = newTime - this.#oldTime
        if (elapsed >= this.#fpsInterval){
            this.#oldTime = newTime - (elapsed % this.#fpsInterval)
            return true
        }
        return false
    }

}

export default FPSController