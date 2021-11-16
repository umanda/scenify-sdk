import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class TemplateHandler extends BaseHandler {
  exportToJSON() {
    const canvasJSON: any = this.canvas.toJSON(this.handlers.propertiesToInclude)
    const frameOptions = this.handlers.frameHandler.getOptions()

    const template = {
      name: 'Untitled design',
      objects: [],
      background: {
        type: 'color',
        value: frameOptions.fill ? frameOptions.fill : '#fff'
      },
      frame: {
        width: frameOptions.width,
        height: frameOptions.height
      }
    }

    const objects = canvasJSON.objects.filter(
      object => object.type !== 'Frame' && object.type !== 'BackgroundImage'
    )
    objects.forEach(object => {
      const exportedObject = exportObject.run(object, frameOptions)
      template.objects = template.objects.concat(exportedObject)
    })

    // return template
    return template
  }

  async importFromJSON(template) {
    this.handlers.objectsHandler.clear()
    const frameParams = template.frame
    this.handlers.frameHandler.updateFrame(frameParams)

    const frameOptions = this.handlers.frameHandler.getOptions()
    for (const object of template.objects) {
      const element = await objectToFabric.run(object, frameOptions)
      if (element) {
        if (this.config.clipToFrame) {
          const frame = this.handlers.frameHandler.getFrame()
          element.clipPath = frame
        }
        this.canvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }
    this.handlers.frameHandler.setBackgroundColor(
      template.background && template.background.type === 'color' ? template.background.value : '#ffffff'
    )
    this.handlers.historyHandler.save('template:load')
    this.handlers.historyHandler.clear()
    this.handlers.zoomHandler.zoomToFit()
  }
}
export default TemplateHandler
