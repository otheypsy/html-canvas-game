import type { DrawImageSource } from "./DrawImageSource.type";

export interface TileSet {
    getSource: (gid: number) => DrawImageSource | undefined
}