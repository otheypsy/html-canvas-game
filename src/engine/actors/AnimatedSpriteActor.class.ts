import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type Renderer from '../graphics/MapRenderer.class'
import type { PixelConfig } from '../types/PixelConfig.type'
import type ActorAnimation from './ActorAnimation.class'
import Actor from '../abstract/Actor.class'
import type { Direction } from '../types/Direction.type'
import type { RectCoordinates } from '../types/RectCoordinates.type'

interface AnimatedSpriteActorContructor {
    tileSet: AggregateTileSet
    pixelConfig: PixelConfig
    animation: ActorAnimation
}

class AnimatedSpriteActor extends Actor {
    readonly #tileSet: AggregateTileSet
    readonly #pixelConfig: PixelConfig
    readonly #animation: ActorAnimation

    constructor(actor: AnimatedSpriteActorContructor) {
        super()
        this.type = 'animatedSprite'
        this.#tileSet = actor.tileSet
        this.#pixelConfig = actor.pixelConfig
        this.#animation = actor.animation
    }

    getRect = (): RectCoordinates => {
        return {
            xPix0: this.mapPixPos.xPix - this.#pixelConfig.xPixUnit / 2,
            yPix0: this.mapPixPos.yPix - this.#pixelConfig.yPixUnit / 2,
            xPix1: this.mapPixPos.xPix + this.#pixelConfig.xPixUnit / 2,
            yPix1: this.mapPixPos.yPix + this.#pixelConfig.yPixUnit / 2,
        }
    }

    draw = (renderer: Renderer, isDebug: boolean = false): void => {
        const source = this.#tileSet.getSource(this.#animation.gid)
        if (source === undefined) return

        const destination = {
            dx: this.mapPixPos.xPix - this.#pixelConfig.xPixUnit / 2,
            dy: this.mapPixPos.yPix - this.#pixelConfig.yPixUnit / 2,
            dw: this.#pixelConfig.xPixUnit,
            dh: this.#pixelConfig.yPixUnit,
        }

        renderer.drawImage({ ...source, ...destination }, isDebug)
    }

    animate = (animateSpeed: number = 1, type: string | null = null): void => {
        if (type != null) this.#animation.animationType = type
        this.#animation.animate(animateSpeed * this.moveSpeed)
    }
}

export default AnimatedSpriteActor
