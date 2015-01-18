import PIXI from 'pixi.js'
import StateMachine from 'javascript-state-machine'
import CPUController from './game/cpu-controller'

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
                { name: 'finishedPlayerPlacement', from: 'placement_player', to: 'placement_cpu' },
                { name: 'finishedCPUPlacement',    from: 'placement_cpu',    to: 'expansion' },
                { name: 'finishedExpansion',       from: 'expansion',        to: 'placement_player' },
            ]
        })

        this.fsm.onplacement_cpu = () => {
            this.cpuController.pickTiles((player, tile) => {
                if (typeof tile === 'undefined') console.log('NOOO', player, tile)
                this.selectTile(tile, player)
            })

            this.fsm.finishedCPUPlacement()
        }

        this.fsm.onexpansion = () => {
            this.grid.expandTiles().forEach((t) => {
                this.selectTile(t.tile, t.player)
            })

            this.fsm.finishedExpansion()
        }
    }

    initializeTiles(grid, tileSize) {
        let padding = Math.ceil(tileSize * 0.1)
        let tileDrawSize = tileSize - padding
        let tileBorderRadius = tileSize * 0.1

        grid.forEachTile((x, y) => {
            let tile = new PIXI.Graphics()

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
        })
    }

    playerSelectTile(data) {
        let tile = data.target
        let player = this.player

        if (!this.fsm.is('placement_player') || tile.tint === player.color) {
            return
        }

        this.selectTile(tile, player)
        this.fsm.finishedPlayerPlacement()
    }

    selectTile(tile, player) {
        tile.player = player
        tile.tint = player.color
    }

    renderGrid() {
        this.renderer.render(this.stage)
    }
}

export default Game
