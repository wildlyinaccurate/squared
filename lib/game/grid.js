import { allCoordinates } from 'lib/matrix'
import ndarray from 'ndarray'

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

    // Gets a tile at the given co-ordinates. If the co-ordinates are
    // out-of-bounds, returns undefined
    getTileWithinBounds(x, y) {
        if (
            x >= 0 &&
            y >= 0 &&
            x < this.tiles.shape[0] &&
            y < this.tiles.shape[1]
        ) {
            return this.tiles.get(x, y)
        }
    }

    getNeighbours(tile) {
        let [x, y] = [tile.x, tile.y]

        return [
            this.getTileWithinBounds(x - 1, y - 1),
            this.getTileWithinBounds(x, y - 1),
            this.getTileWithinBounds(x + 1, y - 1),
            this.getTileWithinBounds(x - 1, y),
            this.getTileWithinBounds(x + 1, y),
            this.getTileWithinBounds(x - 1, y + 1),
            this.getTileWithinBounds(x, y + 1),
            this.getTileWithinBounds(x + 1, y + 1),
        ]
    }

    expandTiles() {
        let expandedTiles = []

        for (let [x, y] of this.allTileCoords()) {
            let thisTile = this.tiles.get(x, y)
            let occupied = {}

            this.getNeighbours(thisTile).forEach((tile) => {
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
