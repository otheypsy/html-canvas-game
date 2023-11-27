import type { DrawImage } from '../types/DrawImage.type'
import type GameOffscreenCanvas from './GameOffscreenCanvas.class'

class OffscreenRenderer {
    drawDebugGrid = (canvas: GameOffscreenCanvas, data: object): void => {
        canvas.context.beginPath()
        canvas.context.strokeStyle = '#f00'
        canvas.context.lineWidth = 1
        canvas.context.strokeRect(Math.ceil(data.dx), Math.ceil(data.dy), Math.ceil(data.dw), Math.ceil(data.dh))
    }

    drawImage = (canvas: GameOffscreenCanvas, data: DrawImage, isDebug: boolean = false): void => {
        canvas.context.drawImage(data.img, data.sx, data.sy, data.sw, data.sh, data.dx, data.dy, data.dw, data.dh)
        if (isDebug) this.drawDebugGrid(canvas, data)
    }
}

export default OffscreenRenderer
