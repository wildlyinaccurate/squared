import PIXI from 'pixi.js'

class Renderer {
    constructor(width, height) {
        this.renderer = new PIXI.CanvasRenderer(width, height)
        this.view = this.renderer.view
        this.stage = new PIXI.Stage(0xffffff)
    }

    render() {
        this.renderer.render(this.stage)
    }
}

export default Renderer
