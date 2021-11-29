import { fabric } from 'fabric'
import BaseHandler from './BaseHandler'
import shourcutsManager from '../utils/shourcutsManager'
import { HandlerOptions } from '../common/interfaces'
import { ObjectType } from '../common/constants'

class EventsHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.initialize()
  }

  initialize() {
    this.canvas.wrapperEl.tabIndex = 1
    this.canvas.wrapperEl.style.outline = 'none'
    // @ts-ignore
    this.canvas.on({
      'mouse:down': this.onMouseDown,
      'mouse:up': this.handleSelection,
      'selection:cleared': this.handleSelection,
      'selection:updated': this.handleSelection,
      'mouse:wheel': this.onMouseWheel,
      'mouse:out': this.onMouseOut,
      'object:modified': this.objectModified
    })

    this.canvas.wrapperEl.addEventListener('keydown', this.onKeyDown.bind(this), false)
  }

  destroy() {
    this.canvas.off({
      'mouse:down': this.onMouseDown,
      'mouse:up': this.handleSelection,
      'selection:cleared': this.handleSelection,
      'selection:updated': this.handleSelection,
      'mouse:wheel': this.onMouseWheel,
      'mouse:out': this.onMouseOut,
      'object:modified': this.objectModified
    })

    this.canvas.wrapperEl.removeEventListener('keydown', this.onKeyDown.bind(this))
  }
  onMouseDown = (e: fabric.IEvent) => {
    this.handlers.objectsHandler.pasteStyle()
    //@ts-ignore
    // e.e.preventDefault()
    if (e.button === 3) {
      // @ts-ignore
      this.context.setContextMenuRequest({ left: e.e.offsetX, top: e.e.offsetY, target: e.target })
    } else {
      this.context.setContextMenuRequest(null)
    }
  }
  objectModified = event => {
    const { target } = event
    if (target instanceof fabric.Textbox) {
      this.scaleTextbox(target)
    }

    this.handlers.historyHandler.save('object:modified')
  }

  onMouseOut = () => {
    this.canvas.renderAll()
  }

  onMouseWheel = event => {
    const isCtrlKey = event.e.ctrlKey
    if (isCtrlKey) {
      this.handleZoom(event)
    }
  }

  handleZoom = event => {
    const delta = event.e.deltaY
    let zoomRatio = this.canvas.getZoom()
    if (delta > 0) {
      zoomRatio -= 0.02
    } else {
      zoomRatio += 0.02
    }
    this.handlers.zoomHandler.zoomToPoint(
      new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2),
      zoomRatio
    )
    event.e.preventDefault()
    event.e.stopPropagation()
  }

  onKeyDown(event) {
    if (shourcutsManager.isCtrlZero(event)) {
      event.preventDefault()
      this.handlers.zoomHandler.zoomToFit()
    } else if (shourcutsManager.isCtrlMinus(event)) {
      event.preventDefault()
      this.handlers.zoomHandler.zoomIn()
    } else if (shourcutsManager.isCtrlEqual(event)) {
      event.preventDefault()
      this.handlers.zoomHandler.zoomOut()
    } else if (shourcutsManager.isCtrlOne(event)) {
      event.preventDefault()
      this.handlers.zoomHandler.zoomToOne()
    } else if (shourcutsManager.isCtrlZ(event)) {
      this.handlers.historyHandler.undo()
    } else if (shourcutsManager.isCtrlShiftZ(event)) {
      this.handlers.historyHandler.redo()
    } else if (shourcutsManager.isCtrlY(event)) {
      this.handlers.historyHandler.redo()
    } else if (shourcutsManager.isAltLeft(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.updateCharSpacing(-10)
    } else if (shourcutsManager.isAltRight(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.updateCharSpacing(+10)
    } else if (shourcutsManager.isAltUp(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.updateLineHeight(+0.1)
    } else if (shourcutsManager.isAltDown(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.updateLineHeight(-0.1)
    } else if (shourcutsManager.isCtrlA(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.selectAll()
    } else if (shourcutsManager.isDelete(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.remove()
    } else if (shourcutsManager.isCtrlC(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.copy()
    } else if (shourcutsManager.isCtrlV(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.paste()
    } else if (shourcutsManager.isCtrlX(event)) {
      event.preventDefault()
      this.handlers.objectsHandler.cut()
    } else if (shourcutsManager.isArrowUp(event)) {
      let nudgeValue = -1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = -10
      }
      this.handlers.objectsHandler.moveVertical(nudgeValue)
    } else if (shourcutsManager.isArrowDown(event)) {
      let nudgeValue = 1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = 10
      }
      this.handlers.objectsHandler.moveVertical(nudgeValue)
    } else if (shourcutsManager.isArrowLeft(event)) {
      let nudgeValue = -1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = -10
      }
      this.handlers.objectsHandler.moveHorizontal(nudgeValue)
    } else if (shourcutsManager.isArrowRight(event)) {
      let nudgeValue = 1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = 10
      }
      this.handlers.objectsHandler.moveHorizontal(nudgeValue)
    }
  }

  handleSelection = target => {
    if (target) {
      this.context.setActiveObject(null)
      const initialSelection = this.canvas.getActiveObject() as any
      const isNotMultipleSelection =
        (initialSelection && initialSelection.type === ObjectType.GROUP) ||
        (initialSelection && initialSelection.type === ObjectType.STATIC_VECTOR)

      if (initialSelection && !isNotMultipleSelection && initialSelection._objects) {
        const filteredObjects = initialSelection._objects.filter(object => {
          if (object.type === ObjectType.BACKGROUND) {
            return false
          }
          return !object.locked
        })
        this.canvas.discardActiveObject()
        if (filteredObjects.length > 0) {
          if (filteredObjects.length === 1) {
            this.canvas.setActiveObject(filteredObjects[0])
            this.context.setActiveObject(filteredObjects[0])
          } else {
            const activeSelection = new fabric.ActiveSelection(filteredObjects, {
              canvas: this.canvas
            })
            this.canvas.setActiveObject(activeSelection)
            this.context.setActiveObject(activeSelection)
          }
        }
      } else {
        this.context.setActiveObject(initialSelection)
      }
    } else {
      this.context.setActiveObject(null)
    }
    this.canvas.renderAll()
  }

  scaleTextbox = (target: fabric.Textbox) => {
    const { fontSize, width, scaleX } = target
    target.set({
      fontSize: fontSize * scaleX,
      width: width * scaleX,
      scaleX: 1,
      scaleY: 1
    })
  }
}

export default EventsHandler
