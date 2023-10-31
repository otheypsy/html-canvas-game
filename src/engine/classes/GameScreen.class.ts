import { PixelPosition } from '../types/PixelPosition'

class GameScreen {
    #center: PixelPosition
    constructor(data) {
        this.#center = {
            xPix: data.xPix,
            yPix: data.yPix,
        }
    }
}

export default GameScreen
