import { EditorConfig, FabricCanvas, HandlerOptions } from '../common/interfaces'
import Handlers from '.'
import { IEditorContext } from '../context'

class BaseHandler {
  public canvas: FabricCanvas
  public root: Handlers
  public context: IEditorContext
  public config: EditorConfig
  constructor({ canvas, root, context, config }: HandlerOptions) {
    this.canvas = canvas
    this.root = root
    this.context = context
    this.config = config
  }
}
export default BaseHandler
