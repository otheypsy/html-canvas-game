class KeyboardControl {
    #keys: object

    constructor(keys: string[]) {
        this.#keys = {}
        this.#initKeys(keys)
        this.#registerKeyDownEvents()
        this.#registerKeyUpEvents()
    }

    #initKeys = (keys): void => {
        for (const key of keys) {
            this.#keys[key] = {
                pressed: false,
            }
        }
    }

    #registerKeyDownEvents = (): void => {
        window.addEventListener('keydown', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = true
        })
    }

    #registerKeyUpEvents = (): void => {
        window.addEventListener('keydown', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = false
        })
    }

    get keys(): object {
        return this.#keys
    }
}

export default KeyboardControl
