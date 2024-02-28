import GameCommand from '../../engine/game/GameCommand.class'
import Directions from '../../engine/abstract/Directions.static'
import type MyGame from '../island/IslandGame.class'
import type WildWestGame from './WildWestGame.class'
import type { Direction } from '../../engine/types/Direction.type'

class WildWestCommand extends GameCommand {
    game: MyGame | WildWestGame

    constructor(game: MyGame | WildWestGame) {
        super(game.config.fps)
        this.game = game
    }

    readonly #collisionMove = (direction: Direction): void => {
        const isColliding = this.game.collisionDetector.checkCollision(this.game.level, this.game.player, direction, 1)
        this.game.player.animation.animate(direction.label)
        if (isColliding === false) {
            this.game.player.movable.move(direction.xOffset, direction.yOffset)
            this.game.camera.setMapOffset(this.game.player.movable.getMapPixPos())
        }
    }

    readonly #movePlayer = (input: string, type: string): void => {
        switch (true) {
            case (input === 'w' && type === 'keyboard') || (input === 'up' && type === 'touchscreen'): {
                this.#collisionMove(Directions.UP)
                break
            }
            case (input === 'a' && type === 'keyboard') || (input === 'left' && type === 'touchscreen'): {
                this.#collisionMove(Directions.LEFT)
                break
            }
            case (input === 's' && type === 'keyboard') || (input === 'down' && type === 'touchscreen'): {
                this.#collisionMove(Directions.DOWN)
                break
            }
            case (input === 'd' && type === 'keyboard') || (input === 'right' && type === 'touchscreen'): {
                this.#collisionMove(Directions.RIGHT)
                break
            }
        }
    }

    readonly #npcInteract = (): void => {
        for (const controller of this.game.npcs) {
            controller?.interact()
        }
    }

    initialize = (): void => {
        this.game.controls.addObserver({
            type: 'keyboard',
            inputs: ['w', 'a', 's', 'd'],
            callback: this.#movePlayer,
        })
        this.game.controls.addObserver({
            type: 'touchscreen',
            inputs: ['up', 'down', 'left', 'right'],
            callback: this.#movePlayer,
        })
        this.game.controls.addObserver({
            type: 'keyboard',
            inputs: ['e'],
            callback: this.#npcInteract,
        })
    }

    logicStep = (): void => {
        this.game.controls.step()
        for (const npc of this.game.npcs) {
            npc.actor.animation.animate()
            npc.updateIsNearby(this.game.player.movable.getMapPixPos(), 50)
        }
    }

    drawStep = (): void => {
        this.game.mapRenderer.saveContext()
        this.game.mapRenderer.clearCanvas()
        // TODO: Fix global translate. Causing visual issues 
        this.game.mapRenderer.globalTranslate()
        this.game.level.drawTileMap(this.game.mapRenderer, '-1')
        for (const npc of this.game.npcs) {
            npc.actor.draw(this.game.mapRenderer)
            npc.drawSpeechBubble(this.game.baseRenderer)
        }
        this.game.player.draw(this.game.mapRenderer)
        this.game.level.drawTileMap(this.game.mapRenderer, '1')
        // this.game.level.drawTileMap(this.game.mapRenderer, '0')
        this.game.mapRenderer.restoreContext()
    }
}

export default WildWestCommand
