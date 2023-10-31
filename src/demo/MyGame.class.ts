import GameCommand from '../engine/game/GameCommand.class'
import type GameBuilder from '../engine/game/Game.builder'

class MyGameCommand extends GameCommand {
    constructor(game: GameBuilder) {
        super(game)
    }

    #renderMaps = (): void => {
        this.game.level.drawBackground(this.game.renderer)
        this.game.level.drawForeground(this.game.renderer)
        this.game.level.drawCollisions(this.game.renderer)
    }

    render = (): void => {
        // this.game.movement.move()
        this.#renderMaps()
        this.game.level.drawActors(this.game.renderer)
    }
}

export default MyGameCommand
