import GameCommand from '../../engine/game/GameCommand.class'
import type IslandGame from './IslandGame.class'

class IslandCommand extends GameCommand {
    game: IslandGame

    constructor(game: IslandGame) {
        super(game.config.fps)
        this.game = game
    }

    readonly #move = (input: string, type: string): void => {
        const moveSpeed = 1
        const mapOffset = this.game.camera.getMapOffset()
        switch (true) {
            case (input === 'w' && type === 'keyboard'): {
                this.game.camera.setMapOffset({
                    xPix: mapOffset.xPix,
                    yPix: mapOffset.yPix - moveSpeed
                })
                break
            }
            case (input === 'a' && type === 'keyboard'): {
                this.game.camera.setMapOffset({
                    xPix: mapOffset.xPix - moveSpeed,
                    yPix: mapOffset.yPix
                })
                break
            }
            case (input === 's' && type === 'keyboard'): {
                this.game.camera.setMapOffset({
                    xPix: mapOffset.xPix,
                    yPix: mapOffset.yPix + moveSpeed
                })
                break
            }
            case (input === 'd' && type === 'keyboard'): {
                this.game.camera.setMapOffset({
                    xPix: mapOffset.xPix + moveSpeed,
                    yPix: mapOffset.yPix
                })
                break
            }
        }
    }

    initialize = (): void => {
        this.game.controls.addObserver({
            type: 'keyboard',
            inputs: ['w', 'a', 's', 'd'],
            callback: this.#move,
        })
    }

    logicStep = (): void => {
        this.game.controls.step()
    }

    drawStep = (): void => {
        this.game.mapRenderer.saveContext()
        this.game.mapRenderer.clearCanvas()
        // TODO: Fix global translate. Causing visual issues 
        this.game.mapRenderer.globalTranslate()
        this.game.level.drawTileMap(this.game.mapRenderer, '-1')
        this.game.level.drawTileMap(this.game.mapRenderer, '1')
        // this.game.level.drawTileMap(this.game.mapRenderer, '0')
        this.game.mapRenderer.restoreContext()
    }
}

export default IslandCommand
