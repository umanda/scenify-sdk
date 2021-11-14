import { fabric } from 'fabric'
import { ObjectType } from '../common/constants'
import { GradientOptions, ShadowOptions } from '../common/interfaces'
import objectToFabric from '../utils/objectToFabric'
import { angleToPoint } from '../utils/parser'
import BaseHandler from './BaseHandler'

class ObjectHandler extends BaseHandler {
  public clipboard
  public isCut

  public add = async item => {
    const { canvas } = this
    const options = this.handlers.frameHandler.getOptions()
    const object: fabric.Object = await objectToFabric.run(item, options)
    if (this.config.clipToFrame) {
      const frame = this.handlers.frameHandler.getFrame()
      object.clipPath = frame
    }
    canvas.add(object)
    object.center()
    canvas.setActiveObject(object)
    this.handlers.historyHandler.save('object:created')
  }

  public update = options => {
    const activeObject = this.canvas.getActiveObject()
    const canvas = this.canvas
    if (activeObject) {
      for (const property in options) {
        activeObject.set(property as keyof fabric.Object, options[property])
        canvas.requestRenderAll()
      }
      this.handlers.historyHandler.save('object:updated')
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
    this.handlers.historyHandler.save('object:removed')
  }

  public clear = () => {
    const frame = this.handlers.frameHandler.getFrame()
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
    this.update({
      top: top
    })
  }

  public moveHorizontal = value => {
    const activeObject = this.canvas.getActiveObject()
    const left = activeObject.left + value
    this.update({
      left: left
    })
  }

  public updateLineHeight = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === 'DynamicText') {
      const lineHeight = activeObject.lineHeight + value
      this.update({
        lineHeight: lineHeight
      })
    }
  }

  public updateCharSpacing = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === 'DynamicText') {
      const charSpacing = activeObject.charSpacing + value
      this.update({
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
      const frame = this.handlers.frameHandler.getFrame()

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
            const frame = this.handlers.frameHandler.getFrame()
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
      const frame = this.handlers.frameHandler.getFrame()
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
      this.context.setActiveObject(filteredObjects[0])
      return
    }
    const activeSelection = new fabric.ActiveSelection(filteredObjects, {
      canvas: this.canvas
    })
    this.canvas.setActiveObject(activeSelection)
    this.canvas.renderAll()
    this.context.setActiveObject(activeSelection)
  }

  /**
   * OBJECT POSITION
   */

  /**
   * Moves an object or a selection up in stack of drawn objects.
   */
  public bringForward = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringForward(activeObject)
    }
  }

  /**
   * Moves an object or the objects of a multiple selection to the top of the stack of drawn objects
   */
  public bringToFront = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringToFront(activeObject)
    }
  }

  /**
   * Moves an object or a selection down in stack of drawn objects.
   */
  public sendBackwards = () => {
    const objects = this.canvas.getObjects()
    const activeObject = this.canvas.getActiveObject()
    const index = objects.findIndex(o => o === activeObject)
    if (activeObject && index > 1) {
      this.canvas.sendBackwards(activeObject)
    }
  }

  /**
   * Moves an object to specified level in stack of drawn objects.
   */
  public sendToBack = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.moveTo(1)
    }
  }

  /**
   * ALIGNMENT TO FRAME OR GROUP
   */

  /**
   * Moves an object to the top of the frame. If multiple objects are selected, will move all objects to the top of the selection.
   */
  public alignTop = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()
    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          currentObject.set('top', refTop)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        currentObject.set('top', frame.top)
      }
      this.canvas.requestRenderAll()
    }
  }
  /**
   * Moves an object to the middle of the frame. If multiple objects are selected, will move all objects to the middle of the selection.
   */
  public alignMiddle = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        const refHeight = activeObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set('top', refTop + refHeight / 2 - currentObjectHeight / 2)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set('top', frame.top + frame.height / 2 - currentObjectHeight / 2)
      }
      this.canvas.requestRenderAll()
    }
  }
  /**
   * Moves an object to the bottom of the frame. If multiple objects are selected, will move all objects to the bottom of the selection.
   */
  public alignBottom = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        const refHeight = activeObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set('top', refTop + refHeight - currentObjectHeight)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set('top', frame.top + frame.height - currentObjectHeight)
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the left of the frame. If multiple objects are selected, will move all objects to the left of the selection.
   */
  public alignLeft = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()
    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          currentObject.set('left', refLeft)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        currentObject.set('left', frame.left)
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the center of the frame. If multiple objects are selected, will move all objects to the center of the selection.
   */
  public alignCenter = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        const refWidth = activeObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set('left', refLeft + refWidth / 2 - currentObjectWidth / 2)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set('left', frame.left + frame.width / 2 - currentObjectWidth / 2)
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the right of the frame. If multiple objects are selected, will move all objects to the right of the selection.
   */
  public alignRight = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.handlers.frameHandler.getFrame()

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        const refWidth = activeObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set('left', refLeft + refWidth - currentObjectWidth)
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set('left', frame.left + frame.width - currentObjectWidth)
      }
      this.canvas.requestRenderAll()
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

  public group = () => {
    const frame = this.handlers.frameHandler.getFrame()
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== ObjectType.ACTIVE_SELECTION) {
      return
    }

    if (activeObject instanceof fabric.Group) {
      activeObject._objects.forEach(object => {
        object.clipPath = null
      })
    }
    const group = activeObject.toGroup()
    group.clipPath = frame
    this.canvas.renderAll()
    this.handlers.historyHandler.save('group')
  }

  public ungroup = () => {
    const frame = this.handlers.frameHandler.getFrame()
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== ObjectType.GROUP) {
      return
    }
    const activeSelection = activeObject.toActiveSelection()
    activeSelection._objects.forEach(object => {
      object.clipPath = frame
    })
    this.canvas.renderAll()
    this.handlers.historyHandler.save('ungroup')
  }

  public lock = () => {
    const activeObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (!activeObject) {
      return
    }

    // @ts-ignore
    if (activeObject._objects) {
      // @ts-ignore
      activeObject._objects.forEach(object => {
        object.set({ hasControls: false, lockMovementY: true, lockMovementX: true, locked: true })
      })
      // @ts-ignore
      activeObject.set({ hasControls: false, lockMovementY: true, lockMovementX: true, locked: true })
    } else {
      // @ts-ignore

      activeObject.set({ hasControls: false, lockMovementY: true, lockMovementX: true, locked: true })
    }
    this.canvas.renderAll()
  }
  public unlock = () => {
    const activeObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (!activeObject) {
      return
    }

    // @ts-ignore
    if (activeObject._objects) {
      // @ts-ignore
      activeObject._objects.forEach(object => {
        object.set({ hasControls: true, lockMovementY: false, lockMovementX: false, locked: false })
      })
      // @ts-ignore
      activeObject.set({ hasControls: true, lockMovementY: false, lockMovementX: false, locked: false })
    } else {
      // @ts-ignore

      activeObject.set({ hasControls: true, lockMovementY: false, lockMovementX: false, locked: false })
    }
    this.canvas.renderAll()

    // console.log(activeObject)
  }
}

export default ObjectHandler
