import { EditorConfig, FabricCanvas, HandlerOptions } from '../common/interfaces'
import Handlers from '.'
import { IEditorContext } from '../context'
import Editor from '../Editor'

class BaseHandler {
  public canvas: FabricCanvas
  public handlers: Handlers
  public context: IEditorContext
  public config: EditorConfig
  public editor: Editor
  constructor({ canvas, handlers, context, config, editor }: HandlerOptions) {
    this.canvas = canvas
    this.handlers = handlers
    this.context = context
    this.config = config
    this.editor = editor
  }
}
export default BaseHandler
