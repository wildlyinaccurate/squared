import { allCoordinates } from 'lib/matrix'
import ndarray from 'ndarray'

window.ndarray = ndarray
class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.tiles = ndarray(new Array(width * height), [width, height])
    }

    *allTiles() {
        for (let [x, y] of this.allTileCoords()) {
            yield this.tiles.get(x, y)
        }
    }

    allTileCoords() {
        return allCoordinates(this.tiles)
    }

    expandTiles() {
        let expandedTiles = []

        for (let [x, y] of this.allTileCoords()) {
            let thisTile = this.tiles.get(x, y)
            let neighbours = [
              this.tiles.get(x - 1, y - 1),
              this.tiles.get(x, y - 1),
              this.tiles.get(x + 1, y - 1),
              this.tiles.get(x - 1, y),
              this.tiles.get(x + 1, y),
              this.tiles.get(x - 1, y + 1),
              this.tiles.get(x, y + 1),
              this.tiles.get(x + 1, y + 1),
            ]

            let occupied = {}

            neighbours.forEach((tile) => {
                if (tile && tile.player) {
                    let c = tile.player.color

                    occupied[c] = occupied[c] || []
                    occupied[c].push(tile)
                }
            })

            let orderedByTiles = Object.keys(occupied).sort((a, b) => occupied[b].length - occupied[a].length)
            let leaderTiles = occupied[orderedByTiles[0]] || []

            if (leaderTiles.length >= 4 && leaderTiles[0].player !== thisTile.player) {
                expandedTiles.push({
                    tile: thisTile,
                    player: leaderTiles[0].player,
                })
            }
        }

        console.log('Calculated tiles for expansion', expandedTiles)

        return expandedTiles
    }

    allTilesOwned() {
        for (let tile of this.allTiles()) {
            if (!tile.player) {
                return false
            }
        }

        return true
    }
}

export default Grid
