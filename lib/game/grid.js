import ndarray from 'ndarray'

window.ndarray = ndarray
class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.tiles = ndarray(new Array(width * height), [width, height])
    }

    forEachTile(cb) {
        let nx = this.tiles.shape[0]
        let ny = this.tiles.shape[1]

        for (let x = 0; x < nx; ++x) {
            for (let y = 0; y < ny; ++y) {
                cb(x, y)
            }
        }
    }

    expandTiles() {
        let expandedTiles = []

        this.forEachTile((x, y) => {
            let thisTile = this.tiles.get(x, y)
            let neighbours = [
              this.tiles.get(x, y - 1),
              this.tiles.get(x, y + 1),
              this.tiles.get(x + 1, y),
              this.tiles.get(x - 1, y),
            ]

            let occupied = {}

            neighbours.forEach((tile) => {
                if (tile && tile.player) {
                    let player = tile.player

                    if (!occupied[player.color]) {
                        occupied[player.color] = { player, count: 0 }
                    }

                    occupied[player.color].count++
                }
            })

            for (let x in occupied) {
                let t = occupied[x]

                if (t.count >= 3 && (!thisTile.player || t.player.color !== thisTile.player.color)) {
                    expandedTiles.push({
                        tile: thisTile,
                        player: t.player,
                    })
                }
            }
        })

        return expandedTiles
    }
}

export default Grid
