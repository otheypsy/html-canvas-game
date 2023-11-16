import GameCommand from '../engine/game/GameCommand.class'
import Directions from '../engine/abstract/Directions.static'
import type MyGame from './MyGame.class'
import type { Direction } from '../engine/types/Direction.type'

class MyGameCommand extends GameCommand {
    game: MyGame

    constructor(game: MyGame) {
        super(game.config.fps)
        this.game = game
    }

    #collisionMove = (direction: Direction): void => {
        const isColliding = this.game.collisionDetector.checkCollision(this.game.level, this.game.player, direction, 1)
        this.game.player.animate(10, direction.label)
        if (!isColliding) {
            this.game.player.move(direction, 1)
            this.game.camera.setMapOffset(this.game.player.getMapPixPos())
        }
    }

    #movePlayer = (input: string, type: string): void => {
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

    #npcInteract = (): void => {
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
            npc.actor.animate()
            npc.updateIsNearby(this.game.player.getMapPixPos(), 50)
        }
    }

    drawStep = (): void => {
        this.game.mapRenderer.saveContext()
        this.game.mapRenderer.globalTranslate()
        this.game.level.drawBackground(this.game.mapRenderer)
        // this.game.level.drawCollisions(this.game.mapRenderer)
        for (const npc of this.game.npcs) {
            npc.actor.draw(this.game.mapRenderer)
            npc.drawSpeechBubble(this.game.baseRenderer)
        }
        this.game.player.draw(this.game.mapRenderer)
        this.game.level.drawForeground(this.game.mapRenderer)
        this.game.mapRenderer.restoreContext()
    }

    step = (): void => {
        this.logicStep()
        this.drawStep()
    }
}

export default MyGameCommand
