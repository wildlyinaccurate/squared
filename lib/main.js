import Game from './game'
import Grid from './game/grid'
import Player from './game/player'
import ConservativeCPU from './game/cpu/conservative'
import CopycatCPU from './game/cpu/copycat'
import RandomCPU from './game/cpu/random'

let viewContainer = document.querySelector('.renderer-container')
let viewContainerStyle = window.getComputedStyle(viewContainer)

let pd = (a, b) => parseInt(viewContainerStyle[a], 10) + parseInt(viewContainerStyle[b], 10)

let viewWidth = viewContainer.clientWidth - pd('paddingLeft', 'paddingRight')
let viewHeight = viewContainer.clientHeight - pd('paddingTop', 'paddingBottom')

let gridWidth = 16
let tileSize = viewWidth / gridWidth
let gridHeight = Math.floor(viewHeight / tileSize)

let player = new Player(0x428bca)
let grid = new Grid(gridWidth, gridHeight)
let game = new Game(viewWidth, (gridHeight * tileSize), grid, player)

game.renderer.view.className = 'renderer-view'
viewContainer.appendChild(game.renderer.view)

game.initializeTiles(grid, tileSize)

let cpuColors = [
    0x5cb85c,
    0xf0ad4e,
    0xd9534f,
    0x5bc0de,
]

cpuColors.forEach((color) => game.cpuController.addCPUPlayer(ConservativeCPU, color))

let animate = () => {
    game.renderGrid()
}

setInterval(animate, 40)
