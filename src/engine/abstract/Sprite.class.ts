class Sprite {
    readonly #image: HTMLImageElement

    constructor(image: HTMLImageElement) {
        this.#image = image
    }

    get image(): HTMLImageElement {
        return this.#image
    }
}

export default Sprite
