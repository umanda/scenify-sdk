import { fabric } from 'fabric'
import { CanvasOptions, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class CanvasHandler extends BaseHandler {
  public options: CanvasOptions
  constructor(props: HandlerOptions) {
    super(props)
    this.options = {
      width: props.canvas.width,
      height: props.canvas.height
    }
  }
  resize(nextWidth, nextHeight) {
    this.canvas.setWidth(nextWidth).setHeight(nextHeight)
    this.canvas.renderAll()
    const diffWidth = nextWidth / 2 - this.options.width / 2
    const diffHeight = nextHeight / 2 - this.options.height / 2

    this.options.width = nextWidth
    this.options.height = nextHeight

    const deltaPoint = new fabric.Point(diffWidth, diffHeight)
    this.canvas.relativePan(deltaPoint)
  }
}

export default CanvasHandler
