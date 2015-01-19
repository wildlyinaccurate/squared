import PIXI from 'pixi.js'
import StateMachine from 'javascript-state-machine'
import CPUController from './game/cpu-controller'

const PHASE_DELAY = 350

class Game {
    constructor(width, height, grid, player) {
        this.renderer = PIXI.autoDetectRenderer(width, height)
        this.stage = new PIXI.Stage(0xdddddd)
        this.grid = grid
        this.player = player
        this.cpuController = new CPUController(this.grid)
        this.cpuController.addHumanPlayer(this.player)

        this.fsm = StateMachine.create({
            initial: 'placement_player',
            events: [
                { name: 'finishPlayerPlacement', from: 'placement_player', to: 'placement_cpu' },
                { name: 'finishCPUPlacement',    from: 'placement_cpu',    to: 'expansion' },
                { name: 'finishExpansion',       from: 'expansion',        to: 'evaluation' },
                { name: 'finishEvaluation',      from: 'evaluation',       to: 'placement_player' },
                { name: 'finishGame',            from: 'evaluation',       to: 'finish' },
            ]
        })

        this.fsm.onplacement_player = () => {
            console.log('Player Placement phase')
        }

        this.fsm.onplacement_cpu = () => {
            console.log('CPU Placement phase')

            let tileGenerator = this.cpuController.pickTiles()

            setTimeout(() => {
                for (let [player, tile] of tileGenerator) {
                    this.selectTile(tile, player)
                }

                this.fsm.finishCPUPlacement()
            }, PHASE_DELAY)
        }

        this.fsm.onexpansion = () => {
            console.log('Expansion phase')

            setTimeout(() => {
                this.grid.expandTiles().forEach((t) => {
                    console.log('Expanding tile', [t.tile.x, t.tile.y], 'for player', t.player)
                    this.selectTile(t.tile, t.player, true)
                })

                this.fsm.finishExpansion()
            }, PHASE_DELAY)
        }

        this.fsm.onevaluation = () => {
            console.log('Evaluation phase')

            if (this.grid.allTilesOwned()) {
                this.fsm.finishGame()
            } else {
                this.fsm.finishEvaluation()
            }
        }

        this.fsm.onfinish = () => {
            alert('The game is finished!')
        }
    }

    initializeTiles(grid, tileSize) {
        let padding = Math.ceil(tileSize * 0.1)
        let tileDrawSize = tileSize - padding
        let tileBorderRadius = tileSize * 0.1

        for (let [x, y] of grid.allTileCoords()) {
            let tile = new PIXI.Graphics()

            tile.x = x
            tile.y = y

            tile.buttonMode = true
            tile.interactive = true
            tile.mousedown = tile.touchstart = this.playerSelectTile.bind(this)

            tile.beginFill(0xffffff)
            tile.drawRoundedRect(
                (x * tileSize) + (padding / 2),
                (y * tileSize) + (padding / 2),
                tileDrawSize,
                tileDrawSize,
                tileBorderRadius
            )
            tile.endFill()

            this.stage.addChild(tile)
            grid.tiles.set(x, y, tile)
        }
    }

    playerSelectTile(data) {
        let tile = data.target
        let player = this.player

        if (!this.fsm.is('placement_player') || tile.tint === player.color) {
            return
        }

        this.selectTile(tile, player)
        this.fsm.finishPlayerPlacement()
    }

    selectTile(tile, player, auto) {
        if (!auto) console.log('Player', player, 'placed tile at', [tile.x, tile.y])

        tile.player = player
        tile.tint = player.color

        if (auto) {
            tile.alpha = 0.1
        }
    }

    renderGrid() {
        for (let tile of this.grid.allTiles()) {
            if (tile.alpha < 1) {
                tile.alpha += 0.05
            }
        }

        this.renderer.render(this.stage)
    }
}

export default Game
