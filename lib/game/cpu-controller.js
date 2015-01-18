import { randomIntBetween } from 'lib/math'

class CPUController {
    constructor(grid) {
        this.grid = grid
        this.players = []
    }

    addPlayer(player) {
        player.base = this.getRandomCoords()
        this.players.push(player)
    }

    pickTiles(cb) {
        this.players.forEach((player) => {
            cb(player, this.pickTileWithinBase(player.base, 3))
        })
    }

    pickTileWithinBase(base, range) {
        let x = randomIntBetween(
            Math.max(0, base[0] - range),
            Math.min(base[0] + range, this.grid.width - 1)
        )

        let y = randomIntBetween(
            Math.max(0, base[1] - range),
            Math.min(base[1] + range, this.grid.width - 1)
        )

        return this.grid.tiles.get(x, y)
    }

    getRandomCoords() {
        return [
            randomIntBetween(0, this.grid.width - 1),
            randomIntBetween(0, this.grid.height - 1),
        ]
    }

    pickRandomTile() {
        let [x, y] = this.getRandomCoords()

        return this.grid.tiles.get(x, y)
    }
}

export default CPUController
