import { Modal as BootstrapModal } from 'bootstrap'
import AnimatedSpriteActor from '../engine/actors/AnimatedSpriteActor.class'
import SpeechBubble from '../engine/classes/SpeechBubble.class'
import { PixelPosition } from '../engine/types/PixelPosition'
import Renderer from '../engine/graphics/Renderer.class'

class NPC {
    #speechBubble: SpeechBubble
    #isNearby: boolean

    readonly #actor: AnimatedSpriteActor
    constructor(actor: AnimatedSpriteActor, speechBubble: SpeechBubble) {
        this.#actor = actor
        this.#isNearby = false
        this.#speechBubble = speechBubble
    }

    get actor(): AnimatedSpriteActor {
        return this.#actor
    }

    interact = (): void => {
        if (this.#isNearby) {
            const element = document.getElementById('gameModal')
            const modal = BootstrapModal.getOrCreateInstance(element)
            modal.show()
        }
    }

    updateIsNearby = (reference: PixelPosition, threshold: number): void => {
        const { xPix, yPix } = this.#actor.getMapPixPos()
        this.#isNearby =
            xPix > reference.xPix - threshold &&
            xPix < reference.xPix + threshold &&
            yPix > reference.yPix - threshold &&
            yPix < reference.yPix + threshold
    }

    drawSpeechBubble = (renderer: Renderer): void => {
        if (this.#isNearby) {
            const { xPix } = this.#actor.getMapPixPos()
            const { y0 } = this.#actor.getRect()
            this.#speechBubble.drawUp(renderer, 'Hello World\n\nPress `E` to interact', xPix, y0)
        }
    }
}

export default NPC
