import { EditorOptions } from './common/interfaces'
import Handlers from './handlers'
import EventManager from './EventManager'

class Editor extends EventManager {
  public handlers: Handlers
  constructor(props: EditorOptions) {
    super()
    this.handlers = new Handlers({ ...props, editor: this })
  }

  // BASIC FUNCTIONS
  public add = (options: any) => {
    this.handlers.objectsHandler.add(options)
  }

  public update = (options: any) => {
    this.handlers.objectsHandler.update(options)
  }

  public copy = () => {
    this.handlers.objectsHandler.copy()
  }

  public cut = () => {
    this.handlers.objectsHandler.cut()
  }

  public paste = () => {
    this.handlers.objectsHandler.paste()
  }

  public clone = () => {
    this.handlers.objectsHandler.clone()
  }

  public selectAll = () => {
    this.handlers.objectsHandler.selectAll()
  }

  public clear = () => {
    this.handlers.objectsHandler.clear()
  }

  // HISTORY
  public undo = () => {
    this.handlers.historyHandler.undo()
  }
  public redo = () => {
    this.handlers.historyHandler.redo()
  }

  // ZOOM
  public zoomIn = () => {
    this.handlers.zoomHandler.zoomIn()
  }

  public zoomOut = () => {
    this.handlers.zoomHandler.zoomOut()
  }

  public zoomToOne = () => {
    this.handlers.zoomHandler.zoomToOne()
  }

  public zoomToFit = () => {
    this.handlers.zoomHandler.zoomToFit()
  }

  public zoomToRatio = (zoomRatio: number) => {
    this.handlers.zoomHandler.zoomToRatio(zoomRatio)
  }
}

export default Editor
