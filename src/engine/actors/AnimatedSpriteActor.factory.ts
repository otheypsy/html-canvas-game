import AggregateTileSet from '../tilesets/AggregateTileSet.class'
import TileSetFactory from '../tilesets/TileSet.factory'

import ActorAnimation from './ActorAnimation.class'
import AnimatedSpriteActor from './AnimatedSpriteActor.class'

interface CreateAnimatedSpriteActor {
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

const handleTileSets = async (tileSetAggregate: AggregateTileSet, tileSets: object[]): Promise<void> => {
    for (const tileSet of tileSets) {
        const tileSetObj = await TileSetFactory.create({
            folderName: tileSet.folderName,
            fileName: tileSet.fileName,
            startId: tileSet.firstgid,
        })
        tileSetAggregate.addTileSet(tileSetObj)
    }
}

const create = async (actor: CreateAnimatedSpriteActor): Promise<AnimatedSpriteActor> => {
    const pixelConfig = {
        xPixUnit: actor.xPixUnit,
        yPixUnit: actor.yPixUnit,
    }

    const tileSetAggregate = new AggregateTileSet()
    await handleTileSets(tileSetAggregate, actor.tilesets)

    const animation = new ActorAnimation({
        sprites: actor.sprites,
    })
    animation.animationType = Object.keys(actor.sprites)[0]

    return new AnimatedSpriteActor({
        tileSet: tileSetAggregate,
        pixelConfig,
        animation,
    })
}

export default { create }
