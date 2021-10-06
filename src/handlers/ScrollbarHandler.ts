import { fabric } from 'fabric'
import BaseHandler from './BaseHandler'

class ScrollbarHandler extends BaseHandler {
  diffTop
  diffBottom
  diffRight
  diffLeft
  constructor(props) {
    super(props)
    this.initialize()
  }

  initialize = () => {
    this.diffBottom = 0
    this.diffLeft = 0
    this.diffRight = 0
    this.diffTop = 0
    this.canvas.on('mouse:wheel', this.onMouseWheel)
    this.initializeScrollY()
    this.initializeScrollX()
  }

  destroy = () => {
    const scrollbarY = document.getElementById('scrollbarY')
    this.canvas.off('mouse:wheel', this.onMouseWheel)
    scrollbarY.removeEventListener('mousedown', this.scrollbarYMouseDown)
  }

  onMouseWheel = event => {
    const isCtrlKey = event.e.ctrlKey
    if (!isCtrlKey) {
      this.handlePan(event)
    }
    this.updateScrollPosition()
  }

  handlePan = event => {
    const delta = event.e.deltaY
    const isShiftKey = event.e.shiftKey
    let change = delta > 0 ? 10 : -10
    if (isShiftKey) {
      this.handleScrollX(change)
    } else {
      this.handleScrollY(change)
    }
  }

  handleScrollX = (delta: number) => {
    if (delta > 0) {
      if (this.diffRight > 200) {
        return
      }
    } else {
      if (this.diffLeft > 200) {
        return
      }
    }
    let pointX = -delta
    let pointY = 0
    const point = new fabric.Point(pointX, pointY)
    this.canvas.relativePan(point)
    this.updateScrollPosition()
  }

  handleScrollY = (delta: number) => {
    if (delta > 0) {
      if (this.diffBottom > 200) {
        return
      }
    } else {
      if (this.diffTop > 200) {
        return
      }
    }
    let pointX = 0
    let pointY = -delta
    const point = new fabric.Point(pointX, pointY)
    this.canvas.relativePan(point)
    this.updateScrollPosition()
  }

  updateScrollPosition = () => {
    this.calculateScrollBottom()
    this.calculateScrollRight()

    this.calculateScrollY()
    this.calculateScrollX()
  }

  initializeScrollY = () => {
    const container = document.getElementById('uibox-editor-container')
    const scrollbarContainer = document.createElement('div')
    const scrollbarWrapper = document.createElement('div')
    const scrollbar = document.createElement('div')

    scrollbar.addEventListener('mousedown', this.scrollbarYMouseDown)

    scrollbar.setAttribute('id', 'scrollbarY')

    this.setElementStyle(scrollbarContainer, {
      position: 'absolute',
      right: '5px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    })
    this.setElementStyle(scrollbarWrapper, {
      position: 'relative',
      height: 'calc(100% - 30px)',
      width: '6px',
      overflow: 'hidden',
      margin: 'auto',
    })

    this.setElementStyle(scrollbar, {
      position: 'absolute',
      width: '6px',
      background: 'rgba(0,0,0,0.4)',
      height: '0px',
      top: '125px',
      borderRadius: '5px',
    })

    scrollbarContainer.appendChild(scrollbarWrapper)
    scrollbarWrapper.appendChild(scrollbar)
    container.appendChild(scrollbarContainer)
  }

  scrollbarYMouseDown = () => {
    document.addEventListener('mousemove', this.scrollbarYMouseMove)
    document.addEventListener('mouseup', this.scrollbarYMouseUp)
  }

  scrollbarYMouseUp = () => {
    document.removeEventListener('mousemove', this.scrollbarYMouseMove)
    document.removeEventListener('mouseup', this.scrollbarYMouseUp)
  }

  scrollbarYMouseMove = e => {
    const delta = e.movementY
    const change = delta > 0 ? 5 : -5
    this.handleScrollY(change)
  }

  initializeScrollX = () => {
    const container = document.getElementById('uibox-editor-container')
    const scrollbarContainer = document.createElement('div')
    const scrollbarWrapper = document.createElement('div')
    const scrollbar = document.createElement('div')
    scrollbar.addEventListener('mousedown', this.scrollbarXMouseDown)

    scrollbar.setAttribute('id', 'scrollbarX')

    this.setElementStyle(scrollbarContainer, {
      position: 'absolute',
      bottom: '5px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    })

    this.setElementStyle(scrollbarWrapper, {
      position: 'relative',
      width: 'calc(100% - 30px)',
      height: '6px',
      overflow: 'hidden',
      margin: 'auto',
    })

    this.setElementStyle(scrollbar, {
      position: 'absolute',
      width: '600px',
      background: 'rgba(0,0,0,0.4)',
      height: '6px',
      left: '125px',
      borderRadius: '5px',
    })

    scrollbarContainer.appendChild(scrollbarWrapper)
    scrollbarWrapper.appendChild(scrollbar)
    container.appendChild(scrollbarContainer)
  }

  scrollbarXMouseDown = () => {
    document.addEventListener('mousemove', this.scrollbarXMouseMove)
    document.addEventListener('mouseup', this.scrollbarXMouseUp)
  }

  scrollbarXMouseUp = () => {
    document.removeEventListener('mousemove', this.scrollbarXMouseMove)
    document.removeEventListener('mouseup', this.scrollbarXMouseUp)
  }

  scrollbarXMouseMove = e => {
    const delta = e.movementX
    const change = delta > 0 ? 5 : -5
    this.handleScrollX(change)
  }

  calculateScrollY() {
    const canvasHeight = this.canvas.getHeight()
    const scrollbarY = document.getElementById('scrollbarY')
    const { diffTop, diffBottom } = this
    if (diffTop > 0 && diffBottom > 0) {
      scrollbarY.style.height = '0px'
    } else if (diffTop > 0 && diffBottom < 0) {
      let bottom = diffBottom
      let calculatedSize = canvasHeight + diffBottom

      if (canvasHeight / 2 + diffBottom < 100) {
        calculatedSize = 100
        this.setElementStyle(scrollbarY, {
          bottom: 'auto',
          top: 0 + 'px',
          height: calculatedSize + 'px',
        })
      } else {
        this.setElementStyle(scrollbarY, {
          bottom: 'auto',
          top: bottom + 'px',
          height: calculatedSize + 'px',
        })
      }
    } else if (diffTop < 0 && diffBottom < 0) {
      let calculatedSize = canvasHeight + diffBottom + diffTop
      calculatedSize = calculatedSize > 100 ? calculatedSize : 100
      this.setElementStyle(scrollbarY, {
        bottom: 'auto',
        top: Math.abs(diffTop) + 'px',
        height: calculatedSize + 'px',
      })
    } else if (diffTop < 0 && diffBottom > 0) {
      let calculatedSize = canvasHeight + diffTop
      this.setElementStyle(scrollbarY, {
        top: 'auto',
        bottom: diffTop + 'px',
        height: calculatedSize + 'px',
      })
    }
  }

  calculateScrollBottom() {
    const frame = this.root.frameHandler.get()
    const zoomRatio = this.canvas.getZoom()

    const canvasHeight = this.canvas.getHeight()
    const canvasCenter = this.canvas.getCenter()

    const panningOffset = canvasCenter.top - (frame.top + frame.height / 2) * zoomRatio
    const pannintTop = this.canvas.viewportTransform[5] - panningOffset

    const availableSpace = canvasHeight - frame.height * zoomRatio

    const verticalOffset = availableSpace / 2
    const offsetBottom = verticalOffset - pannintTop
    const offsetTop = verticalOffset + pannintTop

    this.diffTop = offsetTop
    this.diffBottom = offsetBottom
  }

  calculateScrollX() {
    const canvasWidth = this.canvas.getWidth()
    const scrollbarX = document.getElementById('scrollbarX')
    const { diffLeft, diffRight } = this

    if (diffLeft > 0 && diffRight > 0) {
      scrollbarX.style.width = '0px'
    } else if (diffLeft > 0 && diffRight < 0) {
      let calculatedSize = canvasWidth + diffRight
      if (canvasWidth / 2 + diffRight < 100) {
        calculatedSize = 100
        this.setElementStyle(scrollbarX, {
          right: 'auto',
          left: 0 + 'px',
          width: calculatedSize + 'px',
        })
      } else {
        this.setElementStyle(scrollbarX, {
          right: 'auto',
          left: diffRight + 'px',
          width: calculatedSize + 'px',
        })
      }
    } else if (diffLeft < 0 && diffRight < 0) {
      let calculatedSize = canvasWidth + diffLeft + diffRight
      calculatedSize = calculatedSize > 100 ? calculatedSize : 100
      this.setElementStyle(scrollbarX, {
        right: 'auto',
        left: Math.abs(diffLeft) + 'px',
        width: calculatedSize + 'px',
      })
    } else if (diffLeft < 0 && diffRight > 0) {
      let calculatedSize = canvasWidth + diffLeft
      this.setElementStyle(scrollbarX, {
        left: 'auto',
        right: diffLeft + 'px',
        width: calculatedSize + 'px',
      })
    }
  }

  calculateScrollRight() {
    const frame = this.root.frameHandler.get()
    const zoomRatio = this.canvas.getZoom()

    const canvasWidth = this.canvas.getWidth()
    const canvasCenter = this.canvas.getCenter()

    const panningOffset = canvasCenter.left - (frame.left + frame.width / 2) * zoomRatio
    const pannintLeft = this.canvas.viewportTransform[4] - panningOffset

    const availableSpace = canvasWidth - frame.width * zoomRatio

    const horizontalOffset = availableSpace / 2
    const offsetRight = horizontalOffset - pannintLeft
    const offsetLeft = horizontalOffset + pannintLeft

    this.diffLeft = offsetLeft
    this.diffRight = offsetRight
  }

  setElementStyle = (element, styles) => {
    Object.keys(styles).forEach(style => {
      element.style[style] = styles[style]
    })
  }
}

export default ScrollbarHandler
