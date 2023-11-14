import '../style.css'
import MyGame from './MyGame.class'
import MyGameCommand from './MyGameCommand.class'

const initialize = async (): Promise<MyGameCommand> => {
    const game = new MyGame()
    await game.initialize()
    return new MyGameCommand(game)
}

const run = async (): Promise<void> => {
    const myGameCommand = await initialize()
    myGameCommand.initialize()
    myGameCommand.start()
    // myGameCommand.step()
}

window.onload = () => {
    void run()
}
