import Camera from './Camera.class'

import type { CameraData } from '../types/CameraData.type'
import type GameCanvas from './GameCanvas.class'

const create = (canvas: GameCanvas, data: CameraData, scale: number): Camera => {
    return new Camera({
        mapCenter: {
            xPix: data.start.x * data.tilewidth * scale + (data.tilewidth * scale) / 2,
            yPix: data.start.y * data.tileheight * scale + (data.tileheight * scale) / 2,
        },
        xPixUnit: data.tilewidth * scale,
        yPixUnit: data.tileheight * scale,
    })
}

export default { create }
