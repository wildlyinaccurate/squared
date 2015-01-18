import { randomIntBetween } from 'lib/math'
import Player from './player'

class CPUPlayer extends Player {
    constructor(color, controller) {
        super(color)

        this.controller = controller
    }

    getRandomCoords() {
        return [
            randomIntBetween(0, this.controller.grid.width - 1),
            randomIntBetween(0, this.controller.grid.height - 1),
        ]
    }

    pickRandomTile() {
        let [x, y] = this.getRandomCoords()

        return this.controller.grid.tiles.get(x, y)
    }
}

export default CPUPlayer
