import ZoomHandler from '../handlers/ZoomHandler'

class ZoomController {
  private handler: ZoomHandler
  constructor(handler: ZoomHandler) {
    this.handler = handler
  }

  public zoomIn = () => {
    this.handler.zoomIn()
  }
  public zoomOut = () => {
    this.handler.zoomOut()
  }
  public zoomToOne = () => {
    this.handler.zoomToOne()
  }
  public zoomToFit = () => {
    this.handler.zoomToFit()
  }
  public zoomToRatio = (zoomRatio: number) => {
    this.handler.zoomToRatio(zoomRatio)
  }
}

export default ZoomController
