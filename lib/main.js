import Game from './game'
import Grid from './game/grid'
import Player from './game/player'
import ConservativeCPU from './game/cpu/conservative'
import RandomCPU from './game/cpu/random'
import RobinHoodCPU from './game/cpu/robin-hood'

let viewContainer = document.querySelector('.renderer-container')
let viewContainerStyle = window.getComputedStyle(viewContainer)

let pd = (a, b) => parseInt(viewContainerStyle[a], 10) + parseInt(viewContainerStyle[b], 10)

let viewWidth = viewContainer.clientWidth - pd('paddingLeft', 'paddingRight')
let viewHeight = viewContainer.clientHeight - pd('paddingTop', 'paddingBottom')

let gridWidth = 16
let tileSize = Math.floor(viewWidth / gridWidth)
let gridHeight = Math.max(2, Math.floor(viewHeight / tileSize))

let player = new Player(0x428bca)
let grid = new Grid(gridWidth, gridHeight)
let game = new Game(viewWidth, (gridHeight * tileSize), grid, player)

game.renderer.view.className = 'renderer-view'
viewContainer.appendChild(game.renderer.view)

game.initializeTiles(grid, tileSize)

game.cpuController.addCPUPlayer(RandomCPU, 0x5cb85c)
game.cpuController.addCPUPlayer(RandomCPU, 0xf0ad4e)
game.cpuController.addCPUPlayer(ConservativeCPU, 0xd9534f)
game.cpuController.addCPUPlayer(RobinHoodCPU, 0x5bc0de)

let animate = () => {
    game.renderGrid()
}

setInterval(animate, 45)
