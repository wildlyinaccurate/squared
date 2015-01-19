import { randomIntBetween } from 'lib/math'
import CPUPlayer from '../cpu-player'

class CopycatCPU extends CPUPlayer {
    constructor(...args) {
        super(...args)

        let otherPlayers = this.controller.allPlayers()

        this.enemy = otherPlayers[randomIntBetween(0, otherPlayers.length - 1)]
    }

    pickTile() {
        for (let tile of this.controller.grid.allTiles()) {
            if (tile.player && tile.player === this.enemy) return tile
        }

        return this.pickRandomTile()
    }
}

export default CopycatCPU
