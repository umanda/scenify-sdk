import { FabricCanvas, HandlerOptions } from '../common/interfaces'
import Handlers from '.'
import { IEditorContext } from '../context'

class BaseHandler {
  public canvas: FabricCanvas
  public root: Handlers
  public context: IEditorContext
  constructor({ canvas, root, context }: HandlerOptions) {
    this.canvas = canvas
    this.root = root
    this.context = context
  }
}
export default BaseHandler
