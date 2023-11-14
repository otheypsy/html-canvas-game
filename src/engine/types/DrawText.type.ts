export interface DrawText {
    text: string
    fontSize: number
    fontFamily: string
    textAlign: CanvasTextAlign
    textBaseline: CanvasTextBaseline

    fillStyle: string | CanvasGradient | CanvasPattern
    padding: number
}
