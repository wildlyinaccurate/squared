import { randomIntBetween } from 'lib/math'
import CPUPlayer from '../cpu-player'

// Steals the winning player's tiles and gives them to... Himself..?
class RobinHoodCPU extends CPUPlayer {
    constructor(...args) {
        super(...args)

        let otherPlayers = this.controller.allPlayers()

        // Pick a random enemy to begin with
        this.enemy = otherPlayers[randomIntBetween(0, otherPlayers.length - 1)]
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
            return leaderTiles[randomIntBetween(0, leaderTiles.length - 1)]
        }

        return this.pickRandomTile()
    }
}

export default RobinHoodCPU
