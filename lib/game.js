import PIXI from 'pixi.js'
import StateMachine from 'javascript-state-machine'
import CPUController from './game/cpu-controller'

class Game {
    constructor(width, height, grid, player) {
        this.renderer = PIXI.autoDetectRenderer(width, height)
        this.stage = new PIXI.Stage(0xdddddd)
        this.grid = grid
        this.player = player
        this.cpuController = new CPUController()

        this.fsm = StateMachine.create({
            initial: 'placement_player',
            events: [
                { name: 'finishedPlayerPlacement', from: 'placement_player', to: 'placement_cpu' },
                { name: 'finishedCPUPlacement',    from: 'placement_cpu',    to: 'expansion' },
                { name: 'finishedExpansion',       from: 'expansion',        to: 'placement_player' },
            ]
        })

        this.fsm.onplacement_cpu = () => {
            this.cpuController.players.forEach(player => {
                let tile = this.cpuController.pickRandomTile(this.grid)

                this.selectTile(tile, player)
            })

            this.fsm.finishedCPUPlacement()
        }

        this.fsm.onexpansion = () => {
            this.fsm.finishedExpansion()
        }
    }

    addCPUPlayer(player) {
        this.cpuController.addPlayer(player)
    }

    initializeTiles(grid, tileSize) {
        let nx = grid.tiles.shape[0]
        let ny = grid.tiles.shape[1]

        let padding = Math.ceil(tileSize * 0.1)
        let tileDrawSize = tileSize - padding
        let tileBorderRadius = tileSize * 0.1

        for (let x = 0; x < nx; ++x) {
            for (let y = 0; y < ny; ++y) {
                let tile = new PIXI.Graphics()

                tile.gameData = { x, y }

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
        tile.tint = player.color
    }

    renderGrid() {
        this.renderer.render(this.stage)
    }
}

export default Game
