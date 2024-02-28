class SpriteAnimation {
    readonly #animations: Record<string, number[]>
    #animationDelay: number
    #frame: number
    #animationType: string

    constructor(animations: Record<string, number[]>, animationDelay: number = 10) {
        this.#animations = animations
        this.#animationType = Object.keys(animations)[0]
        this.#frame = 0
        this.#animationDelay = animationDelay
    }

    setAnimationDelay = (animationDelay: number): void => {
        this.#animationDelay = animationDelay
    }

    getAnimationDelay = (): number => {
        return this.#animationDelay
    }

    animate(type: string | null = null): void {
        if (type != null) this.#animationType = type
        const wrap = this.#animations[this.#animationType]?.length ?? 1
        this.#frame = (this.#frame + 1) % (wrap * this.#animationDelay)
    }

    getGid(): number {
        const index = Math.floor(this.#frame / this.#animationDelay)
        return this.#animations[this.#animationType][index] ?? 0
    }
}

export default SpriteAnimation
