import GameConfig from '../../engine/game/GameConfig.class'
import GameCanvas from '../../engine/graphics/GameCanvas.class'
import MapRenderer from '../../engine/graphics/MapRenderer.class'
import Controls from '../../engine/controls/Controls.class'
import LevelCollisionDetector from '../../engine/collisions/LevelCollisionDetector.class'
import AnimatedSpriteActorFactory from '../factories/AnimatedSpriteActor.factory'
import Keyboard from '../../engine/controls/Keyboard.class'
import LevelFactory from '../factories/Level.factory'
import type AnimatedSpriteActor from '../../engine/actors/AnimatedSpriteActor.class'
import NPC from '../NPC.class'
import SpeechBubble from '../../engine/classes/SpeechBubble.class'
import Touchscreen from '../../engine/controls/Touchscreen.class'
import Camera from '../../engine/graphics/Camera.class'
import BaseRenderer from '../../engine/graphics/BaseRenderer.class'
import OffscreenRenderer from '../../engine/graphics/OffScreenRenderer.class'
import { loadJSON } from '../services/App.services'

import type Level from '../../engine/level/Level.class'

class IslandGame {
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

    readonly #createCore = (): void => {
        const gameContainer = document.getElementById('gameContainer')
        this.canvas = new GameCanvas(gameContainer)
        this.config = new GameConfig()
        this.config.scale = parseFloat((document.getElementById('scale') as HTMLInputElement)?.value)
        this.config.fps = 120
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

    readonly #creatLevel = async (): Promise<void> => {
        const levelTileMap = await loadJSON('/assets/island/tilemaps/main/main.tilemap.json')
        this.level = await LevelFactory.create({
            gameName: 'island',
            xMax: levelTileMap.width,
            yMax: levelTileMap.height,
            xPixUnit: levelTileMap.tilewidth,
            yPixUnit: levelTileMap.tileheight,
            layers: levelTileMap.layers,
            tilesets: levelTileMap.tilesets,
        })
        this.collisionDetector = new LevelCollisionDetector()
    }

    readonly #createPlayer = async (): Promise<void> => {
        const playerConfig = await loadJSON('/assets/island/actors/player.config.json')
        this.player = await AnimatedSpriteActorFactory.create({
            gameName: 'wildWest',
            tilesets: playerConfig.tilesets,
            xPixUnit: playerConfig.tilewidth,
            yPixUnit: playerConfig.tileheight,
            sprites: playerConfig.sprites,
        })
        const playerStartPos = this.level.helper.tileToPix(playerConfig.start.x, playerConfig.start.y)
        this.player.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)
        this.player.type = 'player'
        this.player.setMoveSpeed(document.getElementById('speed')?.value ?? 1)
        this.camera.setMapOffset(this.player.getMapPixPos())
    }

    readonly #createNPCs = async (): Promise<void> => {
        this.npcs = []
        const speechBubble = new SpeechBubble(this.config)
        const requiredNPCs = ['oldMan']

        for (const npc of requiredNPCs) {
            const config = await loadJSON('/assets/island/actors/' + npc + '.config.json')
            const actor = await AnimatedSpriteActorFactory.create({
                gameName: 'island',
                tilesets: config.tilesets,
                xPixUnit: config.tilewidth,
                yPixUnit: config.tileheight,
                sprites: config.sprites,
            })
            const startPixPos = this.level.helper.tileToPix(config.start.x, config.start.y)
            actor.setMapPixPos(startPixPos.xPix, startPixPos.yPix)
            const instance = new NPC(actor, speechBubble, config.dialogue, config.modalType)
            this.npcs.push(instance)
        }

    }

    readonly #registerSettingsForm = (): void => {
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
        await this.#createPlayer()
        await this.#createNPCs()
        this.#registerSettingsForm()
    }
}

export default IslandGame
