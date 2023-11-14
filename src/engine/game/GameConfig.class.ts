import type { PixelPosition } from '../types/PixelPosition'

class GameConfig {
    #scale: number = 1
    #fps: number = 30
    #drawOffset: PixelPosition

    set fps(fps: number) {
        this.#fps = fps
    }

    get fps(): number {
        return this.#fps
    }

    set scale(scale: number) {
        this.#scale = scale
    }

    get scale(): number {
        return this.#scale
    }

    set drawOffset(drawOffset: PixelPosition) {
        this.#drawOffset = drawOffset
    }

    get drawOffset(): PixelPosition {
        return this.#drawOffset
    }
}

export default GameConfig
