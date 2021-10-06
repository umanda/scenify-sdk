// @ts-nocheck
import { fabric } from 'fabric'
import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'
import { drawCircleIcon, drawVerticalLineIcon, drawHorizontalLineIcon, drawRotateIcon } from '../utils/drawer'

class PersonalizationHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.init()
  }

  init() {
    fabric.Object.prototype.transparentCorners = false
    fabric.Object.prototype.cornerColor = '#20bf6b'
    fabric.Object.prototype.cornerStyle = 'circle'
    fabric.Object.prototype.borderColor = 'rgb(52, 231, 228)'
    fabric.Object.prototype.cornerSize = 12
    fabric.Object.prototype.borderScaleFactor = 2.75
    fabric.Object.prototype.borderOpacityWhenMoving = 0
    fabric.Object.prototype.borderOpacity = 1

    fabric.Object.prototype.controls.tr = new fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.tl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.bl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.br = new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mt = new fabric.Control({
      x: 0,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawHorizontalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mb = new fabric.Control({
      x: 0,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawHorizontalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: 'rotate',
      render: drawRotateIcon,
      cornerSize: 28,
      withConnection: false,
    })

    // Texbox controls
    fabric.Textbox.prototype.controls.tr = fabric.Object.prototype.controls.tr
    fabric.Textbox.prototype.controls.tl = fabric.Object.prototype.controls.tl
    fabric.Textbox.prototype.controls.bl = fabric.Object.prototype.controls.bl
    fabric.Textbox.prototype.controls.br = fabric.Object.prototype.controls.br

    fabric.Textbox.prototype.controls.mt = new fabric.Control({
      render: () => false,
    })

    fabric.Textbox.prototype.controls.mb = fabric.Textbox.prototype.controls.mt

    fabric.Textbox.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: 'resizing',
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: 'resizing',
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: 'rotate',
      render: drawRotateIcon,
      cornerSize: 28,
      withConnection: false,
    })

    this.canvas.selectionColor = 'rgba(52, 231, 228, 0.15)'
    this.canvas.selectionBorderColor = 'rgb(52, 231, 228)'
    this.canvas.selectionLineWidth = 1.5
    this.canvas.on('selection:created', ev => {
      const objects = this.canvas.getActiveObjects()
      if (objects.length > 1) {
        ev.target.setControlsVisibility({
          mt: false,
          mb: false,
          mr: false,
          ml: false,
        })
        ev.target.borderDashArray = [7]
      }
    })
    this.canvas.on('mouse:over', event => {
      const target = event.target
      const activeObjects = this.canvas.getActiveObject()
      if (target && activeObjects !== target) {
        const bound = target.getBoundingRect()
        const ctx = this.canvas.getContext()
        ctx.strokeStyle = 'rgb(52, 231, 228)'
        ctx.lineWidth = 2.5
        ctx.strokeRect(bound.left, bound.top, bound.width, bound.height)
      }
    })
  }
}

export default PersonalizationHandler
