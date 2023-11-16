import type { Direction } from '../types/Direction.type'
import Directions from '../abstract/Directions.static'

interface ActorAnimationConstructor {
    sprites: {
        up: number[]
        left: number[]
        down: number[]
        right: number[]
    }
}

class ActorAnimation {
    #sprites: { up: number[]; left: number[]; down: number[]; right: number[] }
    #frame: number
    #isIdle: boolean
    #animationInterval: number
    #animationType: string

    constructor(animation: ActorAnimationConstructor) {
        this.#sprites = animation.sprites
        this.#animationType = Directions.DOWN.label
        this.#frame = 0
        this.#isIdle = true
        this.#animationInterval = 100
    }

    animate(animateSpeed: number = 1): void {
        const wrap = this.#sprites[this.#animationType].length
        this.#frame = (this.#frame + animateSpeed) % (wrap * this.#animationInterval)
    }

    set animationType(animationType: string) {
        this.#animationType = animationType
    }

    get animationType(): string {
        return this.#animationType
    }

    get gid(): number {
        const index = Math.floor(this.#frame / this.#animationInterval)
        return this.#sprites[this.#animationType][index]
    }
}

export default ActorAnimation
