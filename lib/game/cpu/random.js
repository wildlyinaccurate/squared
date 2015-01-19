import CPUPlayer from '../cpu-player'

class RandomCPU extends CPUPlayer {
    pickTile() {
        return this.pickRandomTile()
    }
}

export default RandomCPU
