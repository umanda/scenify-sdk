import { fabric } from 'fabric'
import throttle from 'lodash/throttle'
import BaseHandler from './BaseHandler'

class TransactionHandler extends BaseHandler {
  redos = []
  undos = []
  state = []
  active = false

  save = type => {
    try {
      if (this.state) {
        const json = this.state
        this.undos.push({
          type,
          json,
        })
        const canvasJSON = this.canvas.toJSON(this.root.propertiesToInclude)
        // @ts-ignore
        canvasJSON.objects.forEach(object => {
          if (object.clipPath) {
            // @ts-ignore

            fabric.util.enlivenObjects([object.clipPath], function (arg1) {
              object.clipPath = arg1[0]
            })
          }
        })
        // @ts-ignore
        this.state = canvasJSON
      }
    } catch (err) {
      console.log(err)
    }
    this.canvas.fire('history:changed')
  }

  clear = () => {
    this.redos = []
    this.undos = []
  }

  undo = throttle(() => {
    const undo = this.undos.pop()
    if (!undo) {
      return
    }
    this.redos.push({
      type: 'redo',
      json: this.state,
    })
    this.replay(undo)
  }, 100)

  redo = throttle(() => {
    const redo = this.redos.pop()
    if (!redo) {
      return
    }
    this.undos.push({
      type: 'undo',
      json: this.state,
    })
    this.replay(redo)
  }, 100)

  replay = async transaction => {
    const objects = transaction.json
    this.state = objects
    this.active = true
    this.root.objectsHandler.clear(true)
    this.canvas.discardActiveObject()
    this.canvas.loadFromJSON(objects, () => {
      this.canvas.renderAll.bind(this.canvas)
      this.canvas.fire('history:changed')
    })
    this.active = false
  }

  getAll = () => {
    return {
      undos: this.undos,
      redos: this.redos,
      state: this.state,
    }
  }
}

export default TransactionHandler
