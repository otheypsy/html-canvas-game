import GameConfig from '../../engine/game/GameConfig.class'
import GameCanvas from '../../engine/graphics/GameCanvas.class'
import MapRenderer from '../../engine/graphics/MapRenderer.class'
import Controls from '../../engine/controls/Controls.class'
import LevelCollisionDetector from '../../engine/collisions/LevelCollisionDetector.class'
import AnimatedSpriteActorFactory from '../factories/AnimatedSpriteActor.factory'
import Keyboard from '../../engine/controls/Keyboard.class'
import LevelFactory from '../factories/Level.factory'
import type AnimatedSpriteActor from '../../engine/actors/AnimatedSpriteActor.class'
import Touchscreen from '../../engine/controls/Touchscreen.class'
import Camera from '../../engine/graphics/Camera.class'
import BaseRenderer from '../../engine/graphics/BaseRenderer.class'
import SpeechBubble from '../../engine/classes/SpeechBubble.class'
import NPC from '../NPC.class'
import { loadJSON } from '../services/App.services'

import type Level from '../../engine/level/Level.class'

class WildWestGame {
    config: GameConfig
    camera: Camera
    canvas: GameCanvas
    level: Level
    controls: Controls
    npcs: NPC[]
    player: AnimatedSpriteActor
    baseRenderer: BaseRenderer
    mapRenderer: MapRenderer
    collisionDetector: LevelCollisionDetector

    readonly #createCore = (): void => {
        const gameContainer = document.getElementById('gameContainer')
        this.config = new GameConfig()
        this.config.scale = document.getElementById('scale')?.value
        this.config.fps = 0
        this.canvas = new GameCanvas(gameContainer, this.config.scale)
        this.camera = new Camera()
        const touchscreen = new Touchscreen(this.canvas.element)
        const keyboard = new Keyboard(['w', 'a', 's', 'd', 'e'])
        this.controls = new Controls(keyboard, touchscreen)
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
        const levelTileMap = await loadJSON('/assets/wildWest/tilemaps/main/main.tilemap.json')
        this.level = await LevelFactory.create({
            gameName: 'wildWest',
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
        const playerConfig = await loadJSON('/assets/wildWest/actors/player.config.json')
        this.player = await AnimatedSpriteActorFactory.create({
            gameName: 'wildWest',
            tilesets: playerConfig.tilesets,
            xPixUnit: playerConfig.tilewidth,
            yPixUnit: playerConfig.tileheight,
            sprites: playerConfig.sprites,
        })
        const playerStartPos = this.level.helper.tileToPix(playerConfig.start.x, playerConfig.start.y)
        this.player.movable.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)
        this.player.movable.setMoveSpeed(document.getElementById('speed')?.value ?? 1)
        this.camera.setMapOffset(this.player.movable.getMapPixPos())
        console.log('Player Created')
    }

    readonly #createNPCs = async (): Promise<void> => {
        this.npcs = []
        const speechBubble = new SpeechBubble(this.config)
        const requiredNPCs = ['traveller', 'worker', 'bartender', 'sheriff']

        for (const npc of requiredNPCs) {
            const config = await loadJSON('/assets/wildWest/actors/' + npc + '.config.json')
            const actor = await AnimatedSpriteActorFactory.create({
                gameName: 'wildWest',
                tilesets: config.tilesets,
                xPixUnit: config.tilewidth,
                yPixUnit: config.tileheight,
                sprites: config.sprites,
            })
            const startPixPos = this.level.helper.tileToPix(config.start.x, config.start.y)
            actor.movable.setMapPixPos(startPixPos.xPix, startPixPos.yPix)
            const instance = new NPC(actor, speechBubble, config.dialogue, config.modalType)
            this.npcs.push(instance)
            console.log('NPC ' + npc + ' Created')
        }

    }

    readonly #registerSettingsForm = (): void => {
        document.getElementById('scale')?.addEventListener('change', (e: Event): void => {
            const { target } = e
            const scale = parseInt((target as HTMLInputElement).value)
            this.config.scale = scale
        })
        document.getElementById('speed')?.addEventListener('change', (e: Event): void => {
            const { target } = e
            const speed = parseInt((target as HTMLInputElement).value)
            this.player.movable.setMoveSpeed(speed)
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

export default WildWestGame
