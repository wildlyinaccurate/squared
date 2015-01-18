import Player from './player'

class CPUPlayer extends Player {
    constructor(color) {
        super(color)
        this.base = [0, 0]
    }
}

export default CPUPlayer
