import GameConfig from '../engine/game/GameConfig.class'
import GameCanvas from '../engine/graphics/GameCanvas.class'
import Level from '../engine/level/Level.class'
import MapRenderer from '../engine/graphics/MapRenderer.class'
import Controls from '../engine/controls/Controls.class'
import LevelCollisionDetector from '../engine/collisions/LevelCollisionDetector.class'
import AnimatedSpriteActorFactory from './factories/AnimatedSpriteActor.factory'
import Keyboard from '../engine/controls/Keyboard.class'
import mainLevelMap from '../data/levels/main/main.map.json'
import mainLevelConfig from '../data/levels/main/main.config.json'
import LevelFactory from './factories/Level.factory'
import playerConfig from '../data/actors/player.config.json'
import npcConfig from '../data/actors/oldMan.config.json'
import type AnimatedSpriteActor from '../engine/actors/AnimatedSpriteActor.class'
import NPC from './NPC.class'
import SpeechBubble from '../engine/classes/SpeechBubble.class'
import Touchscreen from '../engine/controls/Touchscreen.class'
import Camera from '../engine/graphics/Camera.class'
import BaseRenderer from '../engine/graphics/BaseRenderer.class'
import OffscreenTileMap from '../engine/level/OffscreenTileMap.class'
import OffscreenRenderer from '../engine/graphics/OffScreenRenderer.class'

class MyGame {
    config: GameConfig
    camera: Camera
    canvas: GameCanvas
    level: Level
    controls: Controls
    npcs: NPC[]
    player: AnimatedSpriteActor
    offscreenRenderer: OffscreenRenderer
    baseRenderer: BaseRenderer
    mapRenderer: MapRenderer
    collisionDetector: LevelCollisionDetector

    #createCore = (): void => {
        const gameContainer = document.getElementById('gameContainer')
        this.canvas = new GameCanvas(gameContainer)
        this.config = new GameConfig()
        this.config.scale = document.getElementById('scale').value
        this.config.fps = 60
        this.camera = new Camera()
        this.camera.setCameraWidth(this.canvas.element.width)
        this.camera.setCameraHeight(this.canvas.element.height)
        const touchscreen = new Touchscreen(this.canvas.element)
        const keyboard = new Keyboard(['w', 'a', 's', 'd', 'e'])
        this.controls = new Controls(keyboard, touchscreen)
        this.offscreenRenderer = new OffscreenRenderer()
        this.mapRenderer = new MapRenderer({
            config: this.config,
            canvas: this.canvas,
            camera: this.camera,
        })
        this.baseRenderer = new BaseRenderer({
            config: this.config,
            canvas: this.canvas,
        })
    }

    #creatLevel = async (): Promise<void> => {
        const startLevelData = {
            ...mainLevelMap,
            ...mainLevelConfig,
            config: this.config,
        }
        this.level = await LevelFactory.create({
            xMax: startLevelData.width,
            yMax: startLevelData.height,
            xPixUnit: startLevelData.tilewidth,
            yPixUnit: startLevelData.tileheight,
            layers: startLevelData.layers,
            tilesets: startLevelData.tilesets,
            start: startLevelData.start,
        })
        this.collisionDetector = new LevelCollisionDetector()
    }

    #creatActors = async (): Promise<void> => {
        // Create Player
        this.player = await AnimatedSpriteActorFactory.create({
            tilesets: playerConfig.tilesets,
            xPixUnit: playerConfig.tilewidth,
            yPixUnit: playerConfig.tileheight,
            sprites: playerConfig.sprites,
        })
        const playerStartPos = this.level.helper.tileToPix(playerConfig.start.x, playerConfig.start.y)
        this.player.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)
        this.player.type = 'player'
        this.player.setMoveSpeed(document.getElementById('speed').value)
        this.camera.setMapOffset(this.player.getMapPixPos())

        // Create NPC
        const speechBubble = new SpeechBubble(this.config)
        this.npcs = []
        const npcActor = await AnimatedSpriteActorFactory.create({
            tilesets: npcConfig.tilesets,
            xPixUnit: npcConfig.tilewidth,
            yPixUnit: npcConfig.tileheight,
            sprites: npcConfig.sprites,
        })
        const npcStartPos = this.level.helper.tileToPix(npcConfig.start.x, npcConfig.start.y)
        npcActor.setMapPixPos(npcStartPos.xPix, npcStartPos.yPix)
        const npc = new NPC(npcActor, speechBubble)
        this.npcs.push(npc)
    }

    #registerSettingsForm = (): void => {
        document.getElementById('scale').addEventListener('change', (e): void => {
            this.config.scale = e.target.value
        })
        document.getElementById('speed').addEventListener('change', (e): void => {
            this.player.setMoveSpeed(e.target.value)
        })
    }

    initialize = async (): Promise<void> => {
        this.#createCore()
        await this.#creatLevel()
        await this.#creatActors()
        this.#registerSettingsForm()
    }
}

export default MyGame
