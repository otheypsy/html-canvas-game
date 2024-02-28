import type Renderer from '../graphics/MapRenderer.class'
import type { PixelConfig } from '../types/PixelConfig.type'

import type { Actor } from '../types/Actor.type'
import type SpriteAnimation from '../animations/SpriteAnimation.class'
import type MapMovable from '../abstract/MapMovable.class'
import type { RectCoordinates } from '../types/RectCoordinates.type'
import type { TileSet } from '../types/TileSet.type'

interface AnimatedSpriteActorContructor {
    tileSet: TileSet,
    pixelConfig: PixelConfig
    animation: SpriteAnimation
    movable: MapMovable
}

class AnimatedSpriteActor implements Actor {
    readonly animation: SpriteAnimation
    readonly movable: MapMovable
    readonly #tileSet: TileSet
    readonly #pixelConfig: PixelConfig

    constructor(actor: AnimatedSpriteActorContructor) {
        this.animation = actor.animation
        this.movable = actor.movable
        this.#tileSet = actor.tileSet
        this.#pixelConfig = actor.pixelConfig
    }

    getRect = (): RectCoordinates => {
        return {
            xPix0: this.movable.mapPixPos.xPix - this.#pixelConfig.xPixUnit / 2,
            yPix0: this.movable.mapPixPos.yPix - this.#pixelConfig.yPixUnit / 2,
            xPix1: this.movable.mapPixPos.xPix + this.#pixelConfig.xPixUnit / 2,
            yPix1: this.movable.mapPixPos.yPix + this.#pixelConfig.yPixUnit / 2,
        }
    }

    draw = (renderer: Renderer, isDebug: boolean = false): void => {
        const source = this.#tileSet.getSource(this.animation.getGid())
        if (source === undefined) return

        const destination = {
            dx: this.movable.mapPixPos.xPix - this.#pixelConfig.xPixUnit / 2,
            dy: this.movable.mapPixPos.yPix - this.#pixelConfig.yPixUnit / 2,
            dw: this.#pixelConfig.xPixUnit,
            dh: this.#pixelConfig.yPixUnit,
        }

        renderer.drawImage({ ...source, ...destination }, isDebug)
    }

}

export default AnimatedSpriteActor
