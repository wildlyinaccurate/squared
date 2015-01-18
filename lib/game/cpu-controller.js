import { randomIntBetween } from 'lib/math'

class CPUController {
    constructor(grid) {
        this.grid = grid
        this.cpuPlayers = []
        this.humanPlayers = []
    }

    addCPUPlayer(constructor, color) {
        let player = new constructor(color, this)

        this.cpuPlayers.push(player)
    }

    addHumanPlayer(player) {
        this.humanPlayers.push(player)
    }

    pickTiles(cb) {
        this.cpuPlayers.forEach((player) => {
            cb(player, player.pickTile())
        })
    }
}

export default CPUController
