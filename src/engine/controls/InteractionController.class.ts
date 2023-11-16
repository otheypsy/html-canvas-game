import AnimatedSpriteActor from '../actors/AnimatedSpriteActor.class'
import Keyboard from './Keyboard.class'

interface InteractionObserver {
    key: string
    callback: (key: string) => void
}

class InteractionController {
    readonly #observers: InteractionObserver[]
    readonly #keyboard: Keyboard

    constructor(keyboard: Keyboard) {
        this.#observers = []
        this.#keyboard = keyboard
    }

    addObserver = (observer: InteractionObserver): void => {
        this.#observers.push(observer)
    }

    loop = (): void => {
        for (const observer of this.#observers) {
            if (this.#keyboard?.keys[observer.key]?.pressed === true) {
                observer.callback(observer.key)
            }
        }
    }
}

export default InteractionController
