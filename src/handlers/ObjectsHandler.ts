import { fabric } from 'fabric'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class ObjectHandler extends BaseHandler {
  public clipboard
  public isCut

  public create = async item => {
    const { canvas } = this
    const options = this.root.frameHandler.getOptions()
    const object: fabric.Object = await objectToFabric.run(item, options)
    if (this.config.clipToFrame) {
      const frame = this.root.frameHandler.get()
      object.clipPath = frame
    }
    canvas.add(object)
    object.center()
    canvas.setActiveObject(object)
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

  public clear = (includeFrame = false) => {
    if (includeFrame) {
      this.canvas.clear()
    } else {
      const frame = this.root.frameHandler.get()
      this.canvas.getObjects().forEach(object => {
        if (object.type !== 'Frame') {
          this.canvas.remove(object)
        }
      })
      frame.set('fill', '#ffffff')
    }
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
      activeObject.clone(
        cloned => {
          this.clipboard = cloned
          // console.log({ cloned })
          this.clipboard.clipPath = null
        },
        ['metadata', 'subtype']
      )
    }
  }

  public clone = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.root.frameHandler.get()
    if (this.canvas) {
      let objects: fabric.Object[] = [activeObject]
      // if (activeObject) {
      //   objects = [activeObject]
      // } else if (!!clipBoards.length) {
      //   objects = clipBoards
      // }
      objects.forEach(object => {
        object.clone((clone: fabric.Object) => {
          clone.clipPath = null
          clone.set({
            left: object?.left! + 10,
            top: object?.top! + 10
          })
          clone.clipPath = frame
          this.canvas.add(clone)
          this.canvas.setActiveObject(clone)
          this.canvas.requestRenderAll()
        })
      })
    }
  }

  public paste = () => {
    const { isCut, clipboard } = this
    const frame = this.root.frameHandler.get()
    const padding = isCut ? 0 : 10
    if (!clipboard) {
      return false
    }
    clipboard.clone(
      clonedObj => {
        this.canvas.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left + padding,
          top: clonedObj.top + padding,
          evented: true
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.canvas
          clonedObj.forEachObject(obj => {
            obj.clipPath = frame
            this.canvas.add(obj)
          })
          clonedObj.setCoords()
        } else {
          clonedObj.clipPath = frame
          this.canvas.add(clonedObj)
        }
        clipboard.top += padding
        clipboard.left += padding
        this.canvas.setActiveObject(clonedObj)
        this.canvas.requestRenderAll()
      },
      ['metadata', 'subtype']
    )
    this.isCut = false
    return true
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
      canvas: this.canvas,
      //@ts-ignore
      ...this.activeSelectionOption
    })
    this.canvas.setActiveObject(activeSelection)
    this.canvas.renderAll()
  }

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
}

export default ObjectHandler
