import { ObjectType } from '../common/constants'
import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class TemplateHandler extends BaseHandler {
  exportToJSON() {
    let animated = false
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
      },
      metadata: {
        animated
      }
    }

    const objects = canvasJSON.objects.filter(object => object.type !== ObjectType.FRAME)
    objects.forEach(object => {
      const exportedObject = exportObject.run(object, frameOptions)
      template.objects = template.objects.concat(exportedObject)
      if (object.animations && object.animations !== 'NONE') {
        animated = true
      }
    })
    template.metadata = {
      ...template.metadata,
      animated
    }
    return template
  }

  async importFromJSON(template) {
    this.handlers.objectsHandler.clear()
    const frameParams = template.frame
    this.handlers.frameHandler.setSize(frameParams)

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
    this.handlers.animationHandler.setTemplateAnimations()
  }
}
export default TemplateHandler
