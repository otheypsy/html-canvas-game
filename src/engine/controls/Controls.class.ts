import type Keyboard from './Keyboard.class'
import type Touchscreen from './Touchscreen.class'

type InputType = 'keyboard' | 'touchscreen'

interface InputObserver {
    type: InputType
    inputs: string[]
    callback: (key: string, type: InputType) => void
}

class Controls {
    readonly #keyboard: Keyboard
    readonly #touchscreen: Touchscreen
    readonly #observers: InputObserver[]

    constructor(keyboard: Keyboard, touchscreen: Touchscreen) {
        this.#observers = []
        this.#keyboard = keyboard
        this.#touchscreen = touchscreen
    }

    readonly #checkKeyboard = (observer: InputObserver): void => {
        for (const input of observer.inputs) {
            if (this.#keyboard?.keys[input]?.pressed === true) {
                observer.callback(input, 'keyboard')
            }
        }
    }

    readonly #checkTouchscreen = (observer: InputObserver): void => {
        for (const input of observer.inputs) {
            if (this.#touchscreen?.touches[input]?.active === true) {
                observer.callback(input, 'touchscreen')
            }
        }
    }

    addObserver = (observer: InputObserver): void => {
        this.#observers.push(observer)
    }

    step = (): void => {
        for (const observer of this.#observers) {
            switch (observer.type) {
                case 'keyboard': {
                    this.#checkKeyboard(observer)
                    break
                }
                case 'touchscreen': {
                    this.#checkTouchscreen(observer)
                    break
                }
            }
        }
    }
}

export default Controls
