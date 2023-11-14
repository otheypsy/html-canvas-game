import type Renderer from '../graphics/Renderer.class'
import GameConfig from '../game/GameConfig.class'

const style = {
    text: new Map([
        ['font', '1.6rem Arial'],
        ['textAlign', 'center'],
        ['textBaseline', 'top'],
        ['strokeStyle', 'black'],
        ['fillStyle', 'black'],
    ]),
    bubble: new Map([
        ['strokeStyle', 'black'],
        ['fillStyle', 'white'],
        ['lineWidth', 1],
    ]),
}
class SpeechBubble {
    readonly #config: GameConfig
    readonly #padding: number
    readonly #radius: number
    readonly #pointerHeight: number

    constructor(config: GameConfig) {
        this.#config = config
        this.#padding = 10
        this.#radius = 10
        this.#pointerHeight = 10
    }

    #getUpBubblePath = (xPix: number, yPix: number, width: number, height: number): Path2D => {
        const x0 = xPix - width / 2
        const x1 = xPix + width / 2
        const y0 = yPix - height - this.#padding * 2 - this.#pointerHeight
        const y1 = yPix - this.#pointerHeight
        const path = new Path2D()
        path.moveTo(x0 + this.#radius, y0)
        path.moveTo(x0 + this.#radius, y0)
        path.lineTo(x1 - this.#radius, y0)
        path.quadraticCurveTo(x1, y0, x1, y0 + this.#radius)
        path.lineTo(x1, y1 - this.#radius)
        path.quadraticCurveTo(x1, y1, x1 - this.#radius, y1)
        path.lineTo(x0 + width / 2 + this.#radius, y1)
        path.lineTo(x0 + width / 2, y1 + this.#pointerHeight)
        path.lineTo(x0 + width / 2 - this.#radius, y1)
        path.lineTo(x0 + this.#radius, y1)
        path.quadraticCurveTo(x0, y1, x0, y1 - this.#radius)
        path.lineTo(x0, y0 + this.#radius)
        path.quadraticCurveTo(x0, y0, x0 + this.#radius, y0)
        return path
    }

    drawUp = (renderer: Renderer, text: string, xPix, yPix, width: number = 300): void => {
        renderer.saveContext()
        renderer.setScale(1 / this.#config.scale)
        renderer.configureStyle(style.text)
        const wrapped = renderer.getWrappedText(text, width - this.#padding * 2)

        renderer.configureStyle(style.bubble)
        const path = this.#getUpBubblePath(
            xPix * this.#config.scale,
            yPix * this.#config.scale,
            width,
            wrapped.height * wrapped.wrappedText.length,
        )
        renderer.drawPath(path)

        renderer.configureStyle(style.text)
        const offsetYPix = wrapped.height * wrapped.wrappedText.length + this.#padding + this.#pointerHeight
        for (let i = 0; i < wrapped.wrappedText.length; i++) {
            renderer.drawText(
                wrapped.wrappedText[i],
                xPix * this.#config.scale,
                yPix * this.#config.scale - offsetYPix + wrapped.height * i,
            )
        }
        renderer.restoreContext()
    }
}

export default SpeechBubble
