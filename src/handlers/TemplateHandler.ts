import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class TemplateHandler extends BaseHandler {
  exportTemplate() {
    const canvasJSON: any = this.canvas.toJSON(this.root.propertiesToInclude)
    const frameOptions = this.root.frameHandler.getOptions()

    const template = {
      name: 'Untitled design',
      objects: [],
      background: {
        type: 'color',
        value: frameOptions.fill ? frameOptions.fill : '#fff',
      },
      frame: {
        width: frameOptions.width,
        height: frameOptions.height,
      },
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

  async importTemplate(template) {
    this.root.objectsHandler.clear(false)
    const frame = template.frame
    this.root.frameHandler.create(frame)

    const frameOptions = this.root.frameHandler.getOptions()
    for (const object of template.objects) {
      const element = await objectToFabric.run(object, frameOptions)
      if (element) {
        this.canvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }
    this.root.frameHandler.setBackgroundColor(
      template.background && template.background.type === 'color' ? template.background.value : '#ffffff'
    )
    this.root.transactionHandler.save('template:load')
    this.root.transactionHandler.clear()
    this.root.zoomHandler.zoomToFit()
  }
}
export default TemplateHandler
