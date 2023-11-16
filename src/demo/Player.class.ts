import AnimatedSpriteActor from '../engine/actors/AnimatedSpriteActor.class'

class Player {
    readonly #actor: AnimatedSpriteActor
    constructor(actor: AnimatedSpriteActor) {
        this.#actor = actor
    }

    get actor(): AnimatedSpriteActor {
        return this.#actor
    }

    interact = (): void => {}
}

export default Player
