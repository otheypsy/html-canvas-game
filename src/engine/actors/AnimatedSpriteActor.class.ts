import type AggregateTileSet from '../tilesets/AggregateTileSet.class'
import type Renderer from '../graphics/Renderer.class'
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
            x0: this.mapPixPos.xPix - this.#pixelConfig.xPixUnit / 2,
            y0: this.mapPixPos.yPix - this.#pixelConfig.yPixUnit / 2,
            x1: this.mapPixPos.xPix + this.#pixelConfig.xPixUnit / 2,
            y1: this.mapPixPos.yPix + this.#pixelConfig.yPixUnit / 2,
        }
    }

    draw = (renderer: Renderer, isDebug: boolean = false): void => {
        // console.log(this.#animation.gid)
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

    animate = (animateSpeed: number = 1): void => {
        this.#animation.animate(animateSpeed * this.moveSpeed)
    }

    animatedMove = (direction: Direction, moveSpeed: number = 1, animateSpeed: number = 10): void => {
        this.#animation.animationType = direction.label
        this.#animation.animate(animateSpeed)
        this.move(direction, moveSpeed)
    }
}

export default AnimatedSpriteActor
