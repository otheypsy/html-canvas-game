const divMod = (x, y): number[] => [Math.floor(x / y), x % y]
const calculateResolution = (unitPix, xAspect = 16, yAspect = 9): { width; height } => {
    return {
        width: xAspect * unitPix,
        height: yAspect * unitPix,
    }
}

export { divMod, calculateResolution }
