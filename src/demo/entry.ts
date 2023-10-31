import mainLevelMap from '../data/levels/main/main.map.json'
import mainLevelConfig from '../data/levels/main/main.config.json'
import playerConfig from '../data/actors/player.config.json'
import '../style.css'
import GameConfig from '../engine/game/GameConfig.class'
import GameCanvas from '../engine/classes/GameCanvas.class'
import LevelFactory from '../engine/level/Level.factory'
import PlayerFactory from '../engine/actors/Player.factory'
import Renderer from '../engine/classes/Renderer.class'
import GameBuilder from '../engine/game/Game.builder'
import MyGameCommand from './MyGame.class'
import KeyboardControl from '../engine/controls/KeyboardControl.class'
import Movement from '../engine/controls/Movement.class'
import MapCollisionDetector from '../engine/collisions/MapCollisionDetector.class'

const initialize = async (): Promise<void> => {
    const gameContainer = document.getElementById('gameContainer')

    const config = new GameConfig()
    config.scale = 5
    config.fps = 30
    const startLevelData = {
        ...mainLevelMap,
        ...mainLevelConfig,
        config,
    }
    const canvas = new GameCanvas(gameContainer)
    const level = await LevelFactory.create({
        xMax: startLevelData.width,
        yMax: startLevelData.height,
        xPixUnit: startLevelData.tilewidth,
        yPixUnit: startLevelData.tileheight,
        layers: startLevelData.layers,
        tilesets: startLevelData.tilesets,
        start: startLevelData.start,
    })
    const player = await PlayerFactory.create({
        tilesets: playerConfig.tilesets,
        xPixUnit: playerConfig.tilewidth,
        yPixUnit: playerConfig.tileheight,
    })

    level.registerActor(player)
    const mapStartLocation = level.tileToPix(startLevelData.start.x, startLevelData.start.y)
    const playerStartPos = level.tileToPix(playerConfig.start.x, playerConfig.start.y)
    level.setMapPixPos(mapStartLocation.xPix, mapStartLocation.yPix)
    player.setMapPixPos(playerStartPos.xPix, playerStartPos.yPix)

    const collisions = new MapCollisionDetector(level)
    collisions.checkActorCollisions(player, { x: 10, y: 0 })
    const keyboard = new KeyboardControl(['w', 'a', 's', 'd'])
    const movement = new Movement(keyboard)
    const renderer = new Renderer({
        config,
        canvas,
    })

    // Build Game
    const game = new GameBuilder()
    game.config = config
    game.canvas = canvas
    game.level = level
    game.keyboard = keyboard
    game.movement = movement
    game.renderer = renderer

    const gameCommand = new MyGameCommand(game)

    // gameCommand.start()
    gameCommand.render()
    console.log(gameCommand)
}

window.onload = () => {
    void initialize()
}
