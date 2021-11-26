import FrameHandler from '../handlers/FrameHandler'

class FrameController {
  private handler: FrameHandler

  constructor(handler: FrameHandler) {
    this.handler = handler
  }

  public update(options) {
    this.handler.update(options)
  }

  public setSize(options) {
    this.handler.setSize(options)
  }
}

export default FrameController
