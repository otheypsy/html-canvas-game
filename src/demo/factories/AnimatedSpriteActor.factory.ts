import AggregateTileSet from '../../engine/tilesets/AggregateTileSet.class'
import TileSetFactory from './TileSet.factory'
import AnimatedSpriteActor from '../../engine/actors/AnimatedSpriteActor.class'
import MapMovable from '../../engine/abstract/MapMovable.class'
import SpriteAnimation from '../../engine/animations/SpriteAnimation.class'

interface CreateNPC {
    gameName: string
    tilesets: object[]
    xPixUnit: number
    yPixUnit: number
    sprites: Record<string, number[]>
}

const handleTileSets = async (gameName: string, tileSetAggregate: AggregateTileSet, tileSets: object[]): Promise<void> => {
    for (const tileSet of tileSets) {
        const tileSetObj = await TileSetFactory.create({
            gameName,
            folderName: tileSet.folderName,
            fileName: tileSet.fileName,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (npc: CreateNPC): Promise<AnimatedSpriteActor> => {
    
    const pixelConfig = {
        xPixUnit: npc.xPixUnit,
        yPixUnit: npc.yPixUnit,
    }

    const tileSetAggregate = new AggregateTileSet()
    await handleTileSets(npc.gameName, tileSetAggregate, npc.tilesets)
    const animation = new SpriteAnimation(npc.sprites)
    const movable = new MapMovable()

    return new AnimatedSpriteActor({
        tileSet: tileSetAggregate,
        pixelConfig,
        animation,
        movable
    })
}

export default { create }
