import { fabric } from 'fabric'
import { GradientOptions, ShadowOptions } from '../common/interfaces'
import objectToFabric from '../utils/objectToFabric'
import { angleToPoint } from '../utils/parser'
import BaseHandler from './BaseHandler'

class ObjectHandler extends BaseHandler {
  public clipboard
  public isCut

  public create = async item => {
    const { canvas } = this
    const options = this.root.frameHandler.getOptions()
    const object: fabric.Object = await objectToFabric.run(item, options)
    if (this.config.clipToFrame) {
      const frame = this.root.frameHandler.getFrame()
      object.clipPath = frame
    }
    canvas.add(object)
    object.center()
    canvas.setActiveObject(object)
    this.root.transactionHandler.save('object:created')
  }

  /**
   * Get canvas object by id
   */
  public updateActive = options => {
    const activeObject = this.canvas.getActiveObject()
    const canvas = this.canvas
    if (activeObject) {
      for (const property in options) {
        activeObject.set(property as keyof fabric.Object, options[property])
        canvas.requestRenderAll()
      }
      this.root.transactionHandler.save('object:updated')
    }
  }

  /**
   * Remove active object
   */

  public removeActive = () => {
    this.canvas.getActiveObjects().forEach(obj => {
      this.canvas.remove(obj)
    })
    this.canvas.discardActiveObject().renderAll()
    this.root.transactionHandler.save('object:removed')
  }

  public clear = () => {
    const frame = this.root.frameHandler.getFrame()
    this.canvas.getObjects().forEach(object => {
      if (object.type !== 'Frame') {
        this.canvas.remove(object)
      }
    })
    frame.set('fill', '#ffffff')
    this.canvas.renderAll()
  }

  public moveVertical = value => {
    const activeObject = this.canvas.getActiveObject()
    const top = activeObject.top + value
    this.updateActive({
      top: top
    })
  }

  public moveHorizontal = value => {
    const activeObject = this.canvas.getActiveObject()
    const left = activeObject.left + value
    this.updateActive({
      left: left
    })
  }

  public updateLineHeight = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === 'DynamicText') {
      const lineHeight = activeObject.lineHeight + value
      this.updateActive({
        lineHeight: lineHeight
      })
    }
  }

  public updateCharSpacing = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === 'DynamicText') {
      const charSpacing = activeObject.charSpacing + value
      this.updateActive({
        charSpacing: charSpacing
      })
    }
  }

  public cut = () => {
    this.copy()
    this.isCut = true
    this.remove()
  }

  public copy = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.clipboard = activeObject
    }
  }

  public clone = () => {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject()
      const frame = this.root.frameHandler.getFrame()

      this.canvas.discardActiveObject()

      this.duplicate(activeObject, frame, duplicates => {
        const selection = new fabric.ActiveSelection(duplicates, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
      })
    }
  }

  private duplicate(
    object: fabric.Object,
    frame: fabric.Object,
    callback: (clones: fabric.Object[]) => void
  ): void {
    if (object instanceof fabric.Group) {
      const objects: fabric.Object[] = (object as fabric.Group).getObjects()
      const duplicates: fabric.Object[] = []
      for (let i = 0; i < objects.length; i++) {
        this.duplicate(objects[i], frame, clones => {
          duplicates.push(...clones)
          if (i == objects.length - 1) {
            callback(duplicates)
          }
        })
      }
    } else {
      object.clone(
        (clone: fabric.Object) => {
          clone.clipPath = null
          clone.set({
            left: object.left! + 10,
            top: object.top! + 10
          })

          if (this.config.clipToFrame) {
            const frame = this.root.frameHandler.getFrame()
            clone.clipPath = frame
          }

          this.canvas.add(clone)

          callback([clone])
        },
        ['keyValues', 'src']
      )
    }
  }

  public paste = () => {
    const object = this.clipboard
    if (object) {
      const frame = this.root.frameHandler.getFrame()
      this.canvas.discardActiveObject()
      this.duplicate(object, frame, duplicates => {
        const selection = new fabric.ActiveSelection(duplicates, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
      })
    }
  }

  public remove = () => {
    const activeObjects = this.canvas.getActiveObjects()
    if (!activeObjects) {
      return
    }
    activeObjects.forEach(obj => {
      this.canvas.remove(obj)
    })
    this.canvas.discardActiveObject().renderAll()
  }

  public selectAll = () => {
    this.canvas.discardActiveObject()
    const filteredObjects = this.canvas.getObjects().filter(object => {
      if (object.type === 'Frame') {
        return false
      } else if (!object.evented) {
        return false
        //@ts-ignore
      } else if (object.locked) {
        return false
      }
      return true
    })
    if (!filteredObjects.length) {
      return
    }
    if (filteredObjects.length === 1) {
      this.canvas.setActiveObject(filteredObjects[0])
      this.canvas.renderAll()
      return
    }
    const activeSelection = new fabric.ActiveSelection(filteredObjects, {
      canvas: this.canvas
    })
    this.canvas.setActiveObject(activeSelection)
    this.canvas.renderAll()
  }

  /**
   * OBJECT POSITION
   */
  public bringForward = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringForward(activeObject)
    }
  }

  public bringToFront = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringToFront(activeObject)
    }
  }

  public sendBackwards = () => {
    const objects = this.canvas.getObjects()
    const activeObject = this.canvas.getActiveObject()
    const index = objects.findIndex(o => o === activeObject)
    if (activeObject && index > 1) {
      this.canvas.sendBackwards(activeObject)
    }
  }

  public sendToBack = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.moveTo(1)
    }
  }

  /**
   * ALIGNMENT TO FRAME
   */
  public alignToFrameTop = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  public alignToFrameMiddle = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  public alignToFrameBottom = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  public alignToFrameLeft = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  public alignToFrameCenter = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  public alignToFrameRight = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.getFrame()
    if (activeObject) {
    }
  }

  /**
   * SHADOW
   */
  public setShadow = (options: ShadowOptions) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      if (options.enabled) {
        activeObject.set('shadow', new fabric.Shadow(options))
      } else {
        activeObject.set('shadow', null)
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * GRADIENT
   */
  public setGradient = ({ angle, colors }: GradientOptions) => {
    const activeObject = this.canvas.getActiveObject()
    let odx = activeObject.width >> 1
    let ody = activeObject.height >> 1

    if (activeObject) {
      let startPoint = angleToPoint(angle, activeObject.width, activeObject.height)
      let endPoint = {
        x: activeObject.width - startPoint.x,
        y: activeObject.height - startPoint.y
      }
      activeObject.set(
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
      this.canvas.requestRenderAll()
    }
  }
}

export default ObjectHandler
