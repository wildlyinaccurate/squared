import { randomIntBetween } from 'lib/math'
import CPUPlayer from '../cpu-player'

class ConservativeCPU extends CPUPlayer {
    constructor(...args) {
        super(...args)

        this.base = this.getRandomCoords()
        this.range = 3
    }

    pickTile() {
        return this.pickTileWithinBase(this.base, this.range)
    }

    pickTileWithinBase(base, range) {
        let x = randomIntBetween(
            Math.max(0, base[0] - range),
            Math.min(base[0] + range, this.controller.grid.width - 1)
        )

        let y = randomIntBetween(
            Math.max(0, base[1] - range),
            Math.min(base[1] + range, this.controller.grid.width - 1)
        )

        return this.controller.grid.tiles.get(x, y)
    }
}

export default ConservativeCPU
