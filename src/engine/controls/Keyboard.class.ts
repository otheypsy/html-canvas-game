class Keyboard {
    readonly #keys: Record<string, { pressed: boolean }>

    constructor(keys: string[]) {
        this.#keys = {}
        this.#initKeys(keys)
        this.#registerKeyDownEvents()
        this.#registerKeyUpEvents()
    }

    readonly #initKeys = (keys: string[]): void => {
        for (const key of keys) {
            this.#keys[key] = {
                pressed: false,
            }
        }
    }

    readonly #registerKeyDownEvents = (): void => {
        window.addEventListener('keydown', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = true
        })
    }

    readonly #registerKeyUpEvents = (): void => {
        window.addEventListener('keyup', (e) => {
            if (Object.prototype.hasOwnProperty.call(this.#keys, e.key)) this.#keys[e.key].pressed = false
        })
    }

    get keys(): object {
        return this.#keys
    }
}

export default Keyboard
