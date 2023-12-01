import '../style.css'
import WildWestGame from './wildWest/WildWestGame.class'
// import IslandGame from './island/IslandGame.class'
import MyGameCommand from './MyGameCommand.class'

const initialize = async (): Promise<MyGameCommand> => {
    const game = new WildWestGame()
    await game.initialize()
    return new MyGameCommand(game)
}

const run = async (): Promise<void> => {
    const myGameCommand = await initialize()
    myGameCommand.initialize()
    myGameCommand.start()
    myGameCommand.step()
}

window.onload = () => {
    void run()
}
