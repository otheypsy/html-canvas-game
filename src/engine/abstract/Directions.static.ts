import type { Direction } from '../types/Direction.type'

const up: Direction = {
    label: 'up',
    xOffset: 0,
    yOffset: -1,
}

const down: Direction = {
    label: 'down',
    xOffset: 0,
    yOffset: 1,
}

const left: Direction = {
    label: 'left',
    xOffset: -1,
    yOffset: 0,
}

const right: Direction = {
    label: 'right',
    xOffset: 1,
    yOffset: 0,
}

const Directions = Object.freeze({
    UP: up,
    DOWN: down,
    LEFT: left,
    RIGHT: right,
})

export default Directions
