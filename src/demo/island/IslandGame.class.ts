import GameConfig from '../../engine/game/GameConfig.class'
import GameCanvas from '../../engine/graphics/GameCanvas.class'
import MapRenderer from '../../engine/graphics/MapRenderer.class'
import Controls from '../../engine/controls/Controls.class'
import Keyboard from '../../engine/controls/Keyboard.class'
import LevelFactory from '../factories/Level.factory'
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
    offscreenRenderer: OffscreenRenderer
    baseRenderer: BaseRenderer
    mapRenderer: MapRenderer

    readonly #createCore = (): void => {
        const gameContainer = document.getElementById('gameContainer') as HTMLElement
        this.config = new GameConfig()
        this.config.scale = parseInt((document.getElementById('scale') as HTMLInputElement)?.value)
        this.config.fps = 120
        this.canvas = new GameCanvas(gameContainer, this.config.scale)
        this.camera = new Camera()
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
            isLive: true
        })
        this.camera.setMapOffset({
            xPix: 350,
            yPix: 200
        })
    }

    readonly #registerSettingsForm = (): void => {
        document.getElementById('scale').addEventListener('change', (e): void => {
            this.config.scale = e.target.value
        })
    }

    initialize = async (): Promise<void> => {
        this.#createCore()
        await this.#creatLevel()
        this.#registerSettingsForm()
    }
}

export default IslandGame
