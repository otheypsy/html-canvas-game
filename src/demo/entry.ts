import '../style.css'
import WildWestGame from './wildWest/WildWestGame.class'
import IslandGame from './island/IslandGame.class'
import WildWestCommand from './wildWest/WildWestCommand.class'
import IslandCommand from './island/IslandCommand.class'

const createWildWestGame = async (): Promise<WildWestCommand> => {
    const game = new WildWestGame()
    await game.initialize()
    return new WildWestCommand(game)
}

const createIslandGame = async (): Promise<IslandCommand> => {
    const game = new IslandGame()
    await game.initialize()
    return new IslandCommand(game)
}

const run = async (): Promise<void> => {
    const command = await createWildWestGame()
    command.initialize()
    command.start()
    command.step()
}

window.onload = () => {
    void run()
}
