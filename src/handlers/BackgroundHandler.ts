import { ObjectType } from '../common/constants'
import { CanvasOptions, GradientOptions, HandlerOptions } from '../common/interfaces'
import { angleToPoint } from '../utils/parser'
import BaseHandler from './BaseHandler'
import { fabric } from 'fabric'

class BackgroundHandler extends BaseHandler {
  public options: CanvasOptions
  constructor(props: HandlerOptions) {
    super(props)
  }

  private getBackground = () => {
    return this.canvas.getObjects().find(object => object.type === ObjectType.BACKGROUND)
  }

  setSize = options => {
    const background = this.getBackground()
    if (background) {
      const { width, height } = options
      background.set('width', width)
      background.set('height', height)
      background.center()
    }
  }

  public setBackgroundColor = (color: string) => {
    const background = this.getBackground()
    if (background) {
      background.set('fill', color)
      this.canvas.requestRenderAll()
      this.handlers.historyHandler.save('background:fill')
    }
  }
  public setGradient = ({ angle, colors }: GradientOptions) => {
    const background = this.getBackground()
    if (background) {
      this.setObjectGradient(background, angle, colors)
      this.canvas.requestRenderAll()
      this.handlers.historyHandler.save('background:gradient')
    }
  }

  public setHoverCursor = (cursor: string) => {
    const background = this.getBackground()
    if (background) {
      background.set('hoverCursor', cursor)
    }
  }

  private setObjectGradient = (object: fabric.Object, angle, colors) => {
    let odx = object.width >> 1
    let ody = object.height >> 1
    let startPoint = angleToPoint(angle, object.width, object.height)
    let endPoint = {
      x: object.width - startPoint.x,
      y: object.height - startPoint.y
    }
    object.set(
      'fill',
      new fabric.Gradient({
        type: 'linear',
        coords: {
          x1: startPoint.x - odx,
          y1: startPoint.y - ody,
          x2: endPoint.x - odx,
          y2: endPoint.y - ody
        },
        colorStops: [
          { offset: 0, color: colors[0] },
          { offset: 1, color: colors[1] }
        ]
      })
    )
  }
}

export default BackgroundHandler
