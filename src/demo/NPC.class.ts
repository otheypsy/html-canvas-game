import { Modal as BootstrapModal } from 'bootstrap'

import type AnimatedSpriteActor from '../engine/actors/AnimatedSpriteActor.class'
import type BaseRenderer from '../engine/graphics/BaseRenderer.class'
import type SpeechBubble from '../engine/classes/SpeechBubble.class'
import type { PixelPosition } from '../engine/types/PixelPosition'

class NPC {
    readonly #speechBubble: SpeechBubble
    readonly #dialogue: string
    readonly #modalType: string | null
    #isNearby: boolean

    readonly #actor: AnimatedSpriteActor
    constructor(actor: AnimatedSpriteActor, speechBubble: SpeechBubble, dialogue:string, modalType: string) {
        this.#actor = actor
        this.#isNearby = false
        this.#speechBubble = speechBubble
        this.#dialogue = dialogue
        this.#modalType = modalType
    }

    get actor(): AnimatedSpriteActor {
        return this.#actor
    }

    interact = (): void => {
        if (this.#isNearby && this.#modalType !== null) {
            const element = document.getElementById('gameModal') as HTMLElement
            const modal = BootstrapModal.getOrCreateInstance(element)
            modal.show()
        }
    }

    updateIsNearby = (reference: PixelPosition, threshold: number = 50): void => {
        const { xPix, yPix } = this.#actor.movable.getMapPixPos()
        this.#isNearby =
            xPix > reference.xPix - threshold &&
            xPix < reference.xPix + threshold &&
            yPix > reference.yPix - threshold &&
            yPix < reference.yPix + threshold
    }

    drawSpeechBubble = (renderer: BaseRenderer): void => {
        if (this.#isNearby) {
            const { xPix } = this.#actor.movable.getMapPixPos()
            const { yPix0 } = this.#actor.getRect()
            this.#speechBubble.drawUp(renderer, this.#dialogue, xPix, yPix0)
        }
    }
}

export default NPC
