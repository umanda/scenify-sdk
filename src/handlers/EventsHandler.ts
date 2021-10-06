import { fabric } from 'fabric'
import BaseHandler from './BaseHandler'
import shourcutsManager from '../utils/shourcutsManager'
import { HandlerOptions } from '../common/interfaces'

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
      'selection:created': this.handleSelection,
      'selection:cleared': this.handleSelection,
      'selection:updated': this.handleSelection,
      'mouse:wheel': this.onMouseWheel,
      'mouse:out': this.onMouseOut,
      'object:modified': this.objectModified,
    })

    this.canvas.wrapperEl.addEventListener('keydown', this.onKeyDown.bind(this), false)
  }

  destroy() {
    this.canvas.off({
      'selection:created': this.handleSelection,
      'selection:cleared': this.handleSelection,
      'selection:updated': this.handleSelection,
      'mouse:wheel': this.onMouseWheel,
      'mouse:out': this.onMouseOut,
      'object:modified': this.objectModified,
    })

    this.canvas.wrapperEl.removeEventListener('keydown', this.onKeyDown.bind(this))
  }

  objectModified = () => {
    this.root.transactionHandler.save('object:modified')
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
    this.root.zoomHandler.zoomToPoint(
      new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2),
      zoomRatio
    )
    event.e.preventDefault()
    event.e.stopPropagation()
  }

  onKeyDown(event) {
    if (shourcutsManager.isCtrlZero(event)) {
      event.preventDefault()
      this.root.zoomHandler.zoomToFit()
    } else if (shourcutsManager.isCtrlMinus(event)) {
      event.preventDefault()
      this.root.zoomHandler.zoomIn()
    } else if (shourcutsManager.isCtrlEqual(event)) {
      event.preventDefault()
      this.root.zoomHandler.zoomOut()
    } else if (shourcutsManager.isCtrlOne(event)) {
      event.preventDefault()
      this.root.zoomHandler.zoomToOne()
    } else if (shourcutsManager.isCtrlZ(event)) {
      this.root.transactionHandler.undo()
    } else if (shourcutsManager.isCtrlShiftZ(event)) {
      this.root.transactionHandler.redo()
    } else if (shourcutsManager.isCtrlY(event)) {
      this.root.transactionHandler.redo()
    } else if (shourcutsManager.isAltLeft(event)) {
      event.preventDefault()
      this.root.objectsHandler.updateCharSpacing(-10)
    } else if (shourcutsManager.isAltRight(event)) {
      event.preventDefault()
      this.root.objectsHandler.updateCharSpacing(+10)
    } else if (shourcutsManager.isAltUp(event)) {
      event.preventDefault()
      this.root.objectsHandler.updateLineHeight(+0.1)
    } else if (shourcutsManager.isAltDown(event)) {
      event.preventDefault()
      this.root.objectsHandler.updateLineHeight(-0.1)
    } else if (shourcutsManager.isCtrlA(event)) {
      event.preventDefault()
      this.root.objectsHandler.selectAll()
    } else if (shourcutsManager.isDelete(event)) {
      event.preventDefault()
      this.root.objectsHandler.removeActive()
    } else if (shourcutsManager.isCtrlC(event)) {
      event.preventDefault()
      this.root.objectsHandler.copy()
    } else if (shourcutsManager.isCtrlV(event)) {
      event.preventDefault()
      this.root.objectsHandler.paste()
    } else if (shourcutsManager.isCtrlX(event)) {
      event.preventDefault()
      this.root.objectsHandler.cut()
    } else if (shourcutsManager.isArrowUp(event)) {
      let nudgeValue = -1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = -10
      }
      this.root.objectsHandler.moveVertical(nudgeValue)
    } else if (shourcutsManager.isArrowDown(event)) {
      let nudgeValue = 1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = 10
      }
      this.root.objectsHandler.moveVertical(nudgeValue)
    } else if (shourcutsManager.isArrowLeft(event)) {
      let nudgeValue = -1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = -10
      }
      this.root.objectsHandler.moveHorizontal(nudgeValue)
    } else if (shourcutsManager.isArrowRight(event)) {
      let nudgeValue = 1
      if (shourcutsManager.isShift(event)) {
        nudgeValue = 10
      }
      this.root.objectsHandler.moveHorizontal(nudgeValue)
    }
  }

  handleSelection = target => {
    if (target) {
      this.context.setActiveObject(null)
      const selection = this.canvas.getActiveObject()
      this.context.setActiveObject(selection)
    } else {
      this.context.setActiveObject(null)
    }
  }
}

export default EventsHandler
