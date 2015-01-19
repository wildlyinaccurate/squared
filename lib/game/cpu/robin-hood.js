import { randomArrayItem } from 'lib/array'
import CPUPlayer from '../cpu-player'

// Steals the winning player's tiles and gives them to... Himself..?
class RobinHoodCPU extends CPUPlayer {
    constructor(...args) {
        super(...args)
    }

    pickTile() {
        let players = {}

        for (let tile of this.controller.grid.allTiles()) {
            if (!tile.player || tile.player === this) continue

            let c = tile.player.color

            players[c] = players[c] || []
            players[c].push(tile)
        }

        let orderedByTiles = Object.keys(players).sort((a, b) => players[b].length - players[a].length)
        let leaderTiles = players[orderedByTiles[0]]

        if (leaderTiles.length) {
            return randomArrayItem(leaderTiles)
        }

        return this.pickRandomTile()
    }
}

export default RobinHoodCPU
