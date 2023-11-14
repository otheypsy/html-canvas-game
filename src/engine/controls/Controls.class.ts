import type KeyboardControl from './Keyboard.class'

interface InputObserver {
    key: string
    callback: (key: string) => void
}

interface InputObservers {
    keys: string[]
    callback: (key: string) => void
}

class Controls {
    readonly #keyboard: KeyboardControl
    readonly #observers: InputObserver[]

    constructor(keyboard: KeyboardControl) {
        this.#observers = []
        this.#keyboard = keyboard
    }

    addObserver = (observer: InputObserver): void => {
        this.#observers.push(observer)
    }

    addObservers = (observers: InputObservers): void => {
        for (const key of observers.keys) {
            this.#observers.push({
                key,
                callback: observers.callback,
            })
        }
    }

    step = (): void => {
        for (const observer of this.#observers) {
            if (this.#keyboard?.keys[observer.key]?.pressed === true) {
                observer.callback(observer.key)
            }
        }
    }
}

export default Controls
