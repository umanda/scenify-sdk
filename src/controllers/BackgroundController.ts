import { GradientOptions } from '../common/interfaces'
import BackgroundHandler from '../handlers/BackgroundHandler'

class BackgroundController {
  private handler: BackgroundHandler
  constructor(handler: BackgroundHandler) {
    this.handler = handler
  }
  public setBackgroundColor = (color: string) => {
    this.handler.setBackgroundColor(color)
  }

  public setGradient = ({ angle, colors }: GradientOptions) => {
    this.handler.setGradient({ angle, colors })
  }
}

export default BackgroundController
