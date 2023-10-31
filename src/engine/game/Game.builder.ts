import type GameCanvas from '../classes/GameCanvas.class'
import type Level from '../level/Level.class'
import type GameConfig from './GameConfig.class'
import type KeyboardControl from '../controls/KeyboardControl.class'
import type Movement from '../controls/Movement.class'
import type Renderer from '../classes/Renderer.class'

class GameBuilder {
    #config: GameConfig
    #canvas: GameCanvas
    #level: Level
    #keyboard: KeyboardControl
    #movement: Movement
    #renderer: Renderer

    set config(config: GameConfig) {
        this.#config = config
    }

    get config(): GameConfig {
        return this.#config
    }

    set canvas(canvas: GameCanvas) {
        this.#canvas = canvas
    }

    get canvas(): GameCanvas {
        return this.#canvas
    }

    set level(level: Level) {
        this.#level = level
    }

    get level(): Level {
        return this.#level
    }

    set keyboard(keyboard: KeyboardControl) {
        this.#keyboard = keyboard
    }

    get keyboard(): KeyboardControl {
        return this.#keyboard
    }

    set movement(movement: Movement) {
        this.#movement = movement
    }

    get movement(): Movement {
        return this.#movement
    }

    set renderer(renderer: Renderer) {
        this.#renderer = renderer
    }

    get renderer(): Renderer {
        return this.#renderer
    }
}

export default GameBuilder
