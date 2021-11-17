import { fabric } from 'fabric'
import BaseHandler from './BaseHandler'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'

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
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }

  updateFrame = options => {
    // this.sizeFormat = options
    const frame = this.getFrame()
    const { width, height } = options
    frame.set('width', width)
    frame.set('height', height)
    frame.center()
    this.handlers.zoomHandler.zoomToFit()
    // this.context.setSizeFormat(options)
    // this.handlers.historyHandler.save('frame:update')
    // this.handlers.gridHandler.draw()
  }

  setBackgroundColor = (color: string) => {
    const frame = this.getFrame()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  setBackgroundImageURL = async _url => {
    // this.removeBackgroundImage()
    // const frame = this.get()
    // const image = await loadImageFromURL(url)
    // const element = new fabric.BackgroundImage(image)
    // element.clipPath = frame
    // element.scaleToWidth(frame.width)
    // this.canvas.add(element)
    // element.center()
    // element.moveTo(1)
  }

  getBackgroundImage = () => {
    // return this.canvas.getObjects().find(object => object.type === 'BackgroundImage')
  }

  removeBackgroundImage = () => {
    // const backgroundImage = this.getBackgroundImage()
    // if (backgroundImage) {
    //   this.canvas.remove(backgroundImage)
    // }
  }

  reset = () => {
    // const frame = this.get()
    // frame.set('fill', defaultFrameOptions.fill)
  }

  setSelectionBorder = () => {
    // const frame = this.handlers.Frame.getFrame()
    // frame.setSelectionBorder()
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
