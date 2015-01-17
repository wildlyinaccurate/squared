import Grid from './game/grid'
import Renderer from './game/renderer'

let grid = new Grid(16, 9)
let renderer = new Renderer(window.innerWidth, window.innerHeight)

renderer.view.className = 'renderer-view'

document.body.appendChild(renderer.view)

let animate = () =>
    renderer.render()
    requestAnimationFrame(animate)

requestAnimationFrame(animate)
