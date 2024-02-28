import type GameConfig from '../game/GameConfig.class'
import type BaseRenderer from '../graphics/BaseRenderer.class'

const style = {
    text: {
        'font': '1.2rem Courier New',
        'textAlign': 'center',
        'textBaseline': 'top',
        'strokeStyle': '#6c757d',
        'fillStyle': '#6c757d',
    },
    bubble: {
        'strokeStyle': '#6c757d',
        'fillStyle': 'white',
        'lineWidth': 3,
    },
}
class SpeechBubble {
    readonly #config: GameConfig
    readonly #padding: number
    readonly #radius: number
    readonly #pointerHeight: number

    constructor(config: GameConfig) {
        this.#config = config
        this.#padding = 20
        this.#radius = 10
        this.#pointerHeight = 10
    }

    readonly #getUpBubblePath = (xPix: number, yPix: number, width: number, height: number): Path2D => {
        const xPix0 = xPix - width / 2
        const xPix1 = xPix + width / 2
        const yPix0 = yPix - height - this.#padding * 2 - this.#pointerHeight
        const yPix1 = yPix - this.#pointerHeight
        const path = new Path2D()
        path.moveTo(xPix0 + this.#radius, yPix0)
        path.moveTo(xPix0 + this.#radius, yPix0)
        path.lineTo(xPix1 - this.#radius, yPix0)
        path.quadraticCurveTo(xPix1, yPix0, xPix1, yPix0 + this.#radius)
        path.lineTo(xPix1, yPix1 - this.#radius)
        path.quadraticCurveTo(xPix1, yPix1, xPix1 - this.#radius, yPix1)
        path.lineTo(xPix0 + width / 2 + this.#radius, yPix1)
        path.lineTo(xPix0 + width / 2, yPix1 + this.#pointerHeight)
        path.lineTo(xPix0 + width / 2 - this.#radius, yPix1)
        path.lineTo(xPix0 + this.#radius, yPix1)
        path.quadraticCurveTo(xPix0, yPix1, xPix0, yPix1 - this.#radius)
        path.lineTo(xPix0, yPix0 + this.#radius)
        path.quadraticCurveTo(xPix0, yPix0, xPix0 + this.#radius, yPix0)
        return path
    }

    drawUp = (renderer: BaseRenderer, text: string, xPix: number, yPix: number, width: number = 300): void => {
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
