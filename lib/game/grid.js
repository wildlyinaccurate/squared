import ndarray from 'ndarray'

class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.tiles = ndarray(new Uint8Array(width * height), [width, height])
    }
}

export default Grid
