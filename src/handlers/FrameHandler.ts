import { fabric } from 'fabric'
import BaseHandler from './BaseHandler'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'
import { ObjectType } from '../common/constants'

class FrameHandler extends BaseHandler {
  options
  sizeFormat
  backgroundimage

  constructor(props: HandlerOptions) {
    super(props)
    this.initialize()
  }

  initialize() {
    const frame = new fabric.Frame({
      width: 1280,
      height: 720,
      id: 'frame',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
      absolutePositioned: this.config.clipToFrame
    })
    const background = new fabric.Background({
      width: 1280,
      height: 720,
      fill: '#ffffff',
      id: 'background',
      name: 'Initial Frame'
    })
    this.canvas.add(frame)
    this.canvas.add(background)
    frame.center()
    background.center()
    const watchZoom = setInterval(() => {
      if (this.handlers.zoomHandler.zoomToFit && this.handlers.scrollbarHandler.updateScrollPosition) {
        this.handlers.zoomHandler.zoomToFit()
        this.handlers.scrollbarHandler.updateScrollPosition()
        this.handlers.historyHandler.save('init')
        clearInterval(watchZoom)
      }
    }, 50)
  }

  getFrame = () => {
    return this.canvas.getObjects().find(object => object.type === ObjectType.FRAME)
  }

  setSize = options => {
    const frame = this.getFrame()
    if (frame) {
      const { width, height } = options
      frame.set('width', width)
      frame.set('height', height)
      frame.center()
      this.handlers.backgroundHandler.setSize(options)
    }
    this.handlers.zoomHandler.zoomToFit()
  }

  update = options => {
    const frame = this.getFrame()
    const { width, height } = options
    frame.set('width', width)
    frame.set('height', height)
    frame.center()
    this.handlers.zoomHandler.zoomToFit()
  }

  setBackgroundColor = (color: string) => {
    const frame = this.getFrame()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  getOptions = (): FrameOptions => {
    const frame = this.getFrame()
    return frame.toJSON(this.handlers.propertiesToInclude)
  }

  getFitRatio = () => {
    const canvasWidth = this.canvas.getWidth() - 120
    const canvasHeight = this.canvas.getHeight() - 120
    const options = this.getOptions()
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}

export default FrameHandler
