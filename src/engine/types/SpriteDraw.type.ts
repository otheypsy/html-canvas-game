import type { TilePosition } from './TilePosition.type'

export interface SpriteDraw {
    c: CanvasRenderingContext2D
    position: TilePosition
    scale: number
}
