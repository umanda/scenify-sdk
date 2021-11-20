import CanvasHandler from '../handlers/CanvasHandler'

class CanvasContainerController {
  private handler: CanvasHandler
  constructor(handler: CanvasHandler) {
    this.handler = handler
  }

  resize(nextWidth, nextHeight) {
    this.handler.resize(nextWidth, nextHeight)
  }
}

export default CanvasContainerController
