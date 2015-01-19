import { randomArrayItem } from 'lib/array'
import { allCoordinates } from 'lib/matrix'
import CPUPlayer from '../cpu-player'

// Conservative CPU builds a small base, and then expands it slowly.
class ConservativeCPU extends CPUPlayer {
    constructor(...args) {
        super(...args)

        this.base = this.pickBase(3)
        this.maxBaseSize = 5
    }

    pickBase(size) {
        let tiles = this.controller.grid.tiles
        let middleX = Math.ceil(tiles.shape[0] / 2)
        let middleY = Math.ceil(tiles.shape[1] / 2)

        // Defaults
        let lo = [1, 1]
        let hi = [size + 1, size + 1]

        // Random starting point
        let [x, y] = this.getRandomCoords()

        if (x <= middleX && y <= middleY) {
            // Starting point is in the top-left corner
            lo = [x, y]
            hi = [x + size, y + size]
        } else if (x > middleX && y <= middleY) {
            // Starting point is in the top-right corner
            lo = [x - size, y]
            hi = [x, y + size]
        } else if (x <= middleX && y > middleY) {
            // Starting point is in the bottom-left corner
            lo = [x, y - size]
            hi = [x + size, y]
        } else if (x > middleX && y > middleY) {
            // Starting point is in the bottom-right corner
            lo = [x - size, y - size]
            hi = [x, y]
        }

        return tiles.hi(hi[0], hi[1]).lo(lo[0], lo[1])
    }

    pickTile() {
        let tiles = []

        for (let [x, y] of allCoordinates(this.base)) {
            let tile = this.base.get(x, y)

            if (!tile.player || tile.player !== this) {
                tiles.push(tile)
            }
        }

        if (tiles.length) {
            return randomArrayItem(tiles)
        }

        if (this.base.shape[0] <= this.maxBaseSize) {
            console.log('Expanding base', this)

            this.base.shape[0]++
            this.base.shape[1]++

            return this.pickTile()
        } else {
            console.log('All tiles in base belong to me; picking random tile', this)
            return this.pickRandomTile()
        }
    }
}

export default ConservativeCPU
