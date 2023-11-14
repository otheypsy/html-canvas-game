import GameConfig from '../engine/game/GameConfig.class'
import GameCanvas from '../engine/graphics/GameCanvas.class'
import Level from '../engine/level/Level.class'
import Renderer from '../engine/graphics/Renderer.class'
import Controls from '../engine/controls/Controls.class'
import LevelCollisionDetector from '../engine/collisions/LevelCollisionDetector.class'
import AnimatedSpriteActorFactory from '../engine/actors/AnimatedSpriteActor.factory'
import KeyboardControl from '../engine/controls/Keyboard.class'
import mainLevelMap from '../data/levels/main/main.map.json'
import mainLevelConfig from '../data/levels/main/main.config.json'
import LevelFactory from '../engine/level/Level.factory'
import playerConfig from '../data/actors/player.config.json'
import npcConfig from '../data/actors/oldMan.config.json'
import InteractionController from '../engine/controls/InteractionController.class'
import type AnimatedSpriteActor from '../engine/actors/AnimatedSpriteActor.class'
import NPC from './NPC.class'
import SpeechBubble from '../engine/classes/SpeechBubble.class'

class MyGame {
    #config: GameConfig
    #canvas: GameCanvas
    #level: Level
    #controls: Controls
    #npcs: NPC[]
    #player: AnimatedSpriteActor
    #renderer: Renderer
    #collisionDetector: LevelCollisionDetector
    #interactionController: InteractionController

    #createCore = (): void => {
        const gameContainer = document.getElementById('gameContainer')
        this.#canvas = new GameCanvas(gameContainer)
        this.#config = new GameConfig()
        this.#config.scale = 5
        this.#config.fps = 60
        const keyboard = new KeyboardControl(['w', 'a', 's', 'd', 'e'])
        this.#controls = new Controls(keyboard)
        this.#interactionController = new InteractionController(keyboard)
        this.#renderer = new Renderer({
            config: this.#config,
            canvas: this.#canvas,
        })
    }

    #creatLevel = async (): Promise<void> => {
        const startLevelData = {
            ...mainLevelMap,
            ...mainLevelConfig,
            config: this.#config,
        }
        this.#level = await LevelFactory.create({
            config: this.#config,
            xMax: startLevelData.width,
            yMax: startLevelData.height,
            xPixUnit: startLevelData.tilewidth,
            yPixUnit: startLevelData.tileheight,
            layers: startLevelData.layers,
            tilesets: startLevelData.tilesets,
            start: startLevelData.start,
        })
        this.#collisionDetector = new LevelCollisionDetector()
    }

    #creatActors = async (): Promise<void> => {
        // Create Player
        this.#player = await AnimatedSpriteActorFactory.create({
            tilesets: playerConfig.tilesets,
            xPixUnit: playerConfig.tilewidth,
            yPixUnit: playerConfig.tileheight,
            sprites: playerConfig.sprites,
        })
        const playerStartPos = this.#level.tileToPix(playerConfig.start.x, playerConfig.start.y)
        this.#player.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)
        this.#player.type = 'player'
        this.#config.drawOffset = this.#player.getMapPixPos()

        // Create NPC
        const speechBubble = new SpeechBubble(this.#config)
        this.#npcs = []
        const npcActor = await AnimatedSpriteActorFactory.create({
            tilesets: npcConfig.tilesets,
            xPixUnit: npcConfig.tilewidth,
            yPixUnit: npcConfig.tileheight,
            sprites: npcConfig.sprites,
        })
        const npcStartPos = this.#level.tileToPix(npcConfig.start.x, npcConfig.start.y)
        npcActor.setMapPixPos(npcStartPos.xPix, npcStartPos.yPix)
        const npc = new NPC(npcActor, speechBubble)
        this.#npcs.push(npc)
    }

    initialize = async (): Promise<void> => {
        this.#createCore()
        await this.#creatLevel()
        await this.#creatActors()
    }

    get config(): GameConfig {
        return this.#config
    }

    get level(): Level {
        return this.#level
    }

    get controls(): Controls {
        return this.#controls
    }

    get npcs(): NPC[] {
        return this.#npcs
    }

    get player(): AnimatedSpriteActor {
        return this.#player
    }

    get collisionDetector(): LevelCollisionDetector {
        return this.#collisionDetector
    }

    get renderer(): Renderer {
        return this.#renderer
    }
}

export default MyGame
