import { randomIntBetween } from 'lib/math'

console.log(randomIntBetween,randomIntBetween(0, 4))
class CPUController {
    constructor() {
        this.players = []
    }

    addPlayer(player) {
        this.players.push(player)
    }

    pickRandomTile(grid) {
        let x = randomIntBetween(0, grid.width - 1)
        let y = randomIntBetween(0, grid.height - 1)

        return grid.tiles.get(x, y)
    }
}

export default CPUController
