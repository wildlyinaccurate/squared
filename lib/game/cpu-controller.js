import { randomIntBetween } from 'lib/math'

class CPUController {
    constructor(grid) {
        this.grid = grid
        this.cpuPlayers = []
        this.humanPlayers = []
    }

    allPlayers() {
        return this.cpuPlayers.concat(this.humanPlayers)
    }

    addCPUPlayer(constructor, color) {
        let player = new constructor(color, this)

        this.cpuPlayers.push(player)
    }

    addHumanPlayer(player) {
        this.humanPlayers.push(player)
    }

    *pickTiles() {
        for (let player of this.cpuPlayers) {
            yield [player, player.pickTile()]
        }
    }
}

export default CPUController
