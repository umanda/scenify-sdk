import { EditorConfig, FabricCanvas, HandlerOptions } from '../common/interfaces'
import Handlers from '.'
import { IEditorContext } from '../context'
import Editor from '../Editor'

class BaseHandler {
  protected canvas: FabricCanvas
  protected handlers: Handlers
  protected context: IEditorContext
  protected config: EditorConfig
  protected editor: Editor
  constructor({ canvas, handlers, context, config, editor }: HandlerOptions) {
    this.canvas = canvas
    this.handlers = handlers
    this.context = context
    this.config = config
    this.editor = editor
  }
}
export default BaseHandler
