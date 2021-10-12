import { Template } from '../common/interfaces'
import { fabric } from 'fabric'
import objectToFabric from './objectToFabric'

export class DesignManager {
  private canvas: fabric.StaticCanvas
  template: Template

  constructor(template: Template) {
    this.canvas = new fabric.StaticCanvas(null)
    this.template = template
  }

  async loadTemplate() {
    const template = this.template
    const { frame, background } = template
    this.setDimensions(frame)
    this.setBackground(background)

    for (const object of template.objects) {
      const element = await objectToFabric.run(object)
      console.log({ element })
      if (element) {
        this.canvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }
  }

  setDimensions({ width, height }: { width: number; height: number }) {
    this.canvas.setWidth(width).setHeight(height)
  }

  setBackground(background: { type: string; value: string }) {
    if (!background) {
      return
    }
    this.canvas.setBackgroundColor(background.type === 'color' ? background.value : '#ffffff', () => {
      this.canvas.renderAll()
    })
  }

  async toDataURL() {
    console.log(this.canvas)
    const data = this.canvas.toDataURL({
      multiplier: 3,
      top: 0,
      left: 0,
      height: this.canvas.getHeight(),
      width: this.canvas.getWidth()
    })
    return data
  }
}
