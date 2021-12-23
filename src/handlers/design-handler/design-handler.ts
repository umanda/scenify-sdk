import BaseHandler from '../BaseHandler'
import objectToFabric from './objectToFabric'
import { fabric } from 'fabric'
import { Template } from '../../common/interfaces'

class DesignHandler extends BaseHandler {
  public async toDataURL(params: any) {
    const staticCanvas = new fabric.StaticCanvas(null)
    const template = this.handlers.templateHandler.exportToJSON() as Template
    await this.loadTemplate(staticCanvas, template, params)
    const data = staticCanvas.toDataURL({
      top: 0,
      left: 0,
      height: staticCanvas.getHeight(),
      width: staticCanvas.getWidth()
    })
    return data
  }

  private async loadTemplate(staticCanvas: fabric.StaticCanvas, template: Template, params) {
    const { frame, background } = template
    this.setDimensions(staticCanvas, frame)
    this.setBackground(staticCanvas, background)

    for (const object of template.objects) {
      const element = await objectToFabric.run(object, params)
      if (element) {
        staticCanvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }
  }

  private setDimensions(
    staticCanvas: fabric.StaticCanvas,
    { width, height }: { width: number; height: number }
  ) {
    staticCanvas.setWidth(width).setHeight(height)
  }

  private setBackground(staticCanvas: fabric.StaticCanvas, background: { type: string; value: string }) {
    if (!background) {
      return
    }
    staticCanvas.setBackgroundColor(background.type === 'color' ? background.value : '#ffffff', () => {
      staticCanvas.renderAll()
    })
  }
}

export default DesignHandler
