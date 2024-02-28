import type { DrawImage } from '../types/DrawImage.type'
import type GameOffscreenCanvas from './GameOffscreenCanvas.class'

class OffscreenRenderer {
    drawDebugGrid = (
        canvas: GameOffscreenCanvas,
        data: {
            dx: number
            dy: number
            dw: number
            dh: number
        }
    ): void => {
        canvas.context.beginPath()
        canvas.context.strokeStyle = '#f00'
        canvas.context.lineWidth = 1
        canvas.context.strokeRect(data.dx, data.dy, data.dw, data.dh)
    }

    drawImage = (canvas: GameOffscreenCanvas, data: DrawImage, isDebug: boolean = false): void => {
        canvas.context.drawImage(data.img, data.sx, data.sy, data.sw, data.sh, data.dx, data.dy, data.dw, data.dh)
        if (isDebug) this.drawDebugGrid(canvas, data)
    }
}

export default OffscreenRenderer
