import AggregateTileSet from '../../engine/tilesets/AggregateTileSet.class'
import TileSetFactory from './TileSet.factory'

import ActorAnimation from '../../engine/actors/ActorAnimation.class'
import AnimatedSpriteActor from '../../engine/actors/AnimatedSpriteActor.class'

interface CreateNPC {
    gameName: string
    tilesets: object[]
    xPixUnit: number
    yPixUnit: number
    sprites: {
        up: number[]
        left: number[]
        down: number[]
        right: number[]
    }
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

    const animation = new ActorAnimation({
        sprites: npc.sprites,
    })
    animation.animationType = Object.keys(npc.sprites)[0]

    return new AnimatedSpriteActor({
        tileSet: tileSetAggregate,
        pixelConfig,
        animation,
    })
}

export default { create }
