import GameCommand from '../engine/game/GameCommand.class'
import Directions from '../engine/abstract/Direction.static'
import type MyGame from './MyGame.class'
import type { Direction } from '../engine/types/Direction.type'
import { Modal as BootstrapModal } from 'bootstrap'

class MyGameCommand extends GameCommand {
    game: MyGame

    constructor(game: MyGame) {
        super(game.config.fps)
        this.game = game
    }

    #collisionMove = (direction: Direction): void => {
        const isColliding = this.game.collisionDetector.checkCollision(this.game.level, this.game.player, direction, 1)
        if (!isColliding) {
            this.game.player.animatedMove(direction, 1, 10)
            this.game.config.drawOffset = this.game.player.getMapPixPos()
        }
    }

    #movePlayer = (key: string): void => {
        switch (key) {
            case 'w': {
                this.#collisionMove(Directions.UP)
                break
            }
            case 'a': {
                this.#collisionMove(Directions.LEFT)
                break
            }
            case 's': {
                this.#collisionMove(Directions.DOWN)
                break
            }
            case 'd': {
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
        this.game.controls.addObservers({
            keys: ['w', 'a', 's', 'd'],
            callback: this.#movePlayer,
        })
        this.game.controls.addObservers({
            keys: ['e'],
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
        this.game.renderer.saveContext()
        this.game.renderer.globalTranslate()
        this.game.level.drawBackground(this.game.renderer)
        for (const npc of this.game.npcs) {
            npc.actor.draw(this.game.renderer)
            npc.drawSpeechBubble(this.game.renderer)
        }
        this.game.player.draw(this.game.renderer)
        this.game.level.drawForeground(this.game.renderer)
        this.game.renderer.restoreContext()
    }

    step = (): void => {
        this.logicStep()
        this.drawStep()
    }
}

export default MyGameCommand
