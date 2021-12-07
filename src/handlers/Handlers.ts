import { FabricCanvas, HandlerOptions, RootHandlerOptions } from '../common/interfaces'
import { PROPERTIES_TO_INCLUDE } from '../common/constants'
import CanvasHandler from './CanvasHandler'
import EventsHandler from './EventsHandler'
import FrameHandler from './FrameHandler'
import ObjectsHandler from './ObjectsHandler'
import HistoryHandler from './HistoryHandler'
import ZoomHandler from './ZoomHandler'
import PersonalizationHandler from './PersonalizationHandler'
import TemplateHandler from './TemplateHandler'
import ScrollbarHandler from './ScrollbarHandler'
import DesignHandler from './design-handler/design-handler'
import GifHandler from './gif-handler/gif-handler'
import GuidelinesHandler from './GuidelinesHandler'
import BackgroundHandler from './BackgroundHandler'
import AnimationHandler from './AnimationHandler'
class Handlers {
  canvas: FabricCanvas
  public frameHandler: FrameHandler
  public eventsHandler: EventsHandler
  public canvasHandler: CanvasHandler
  public objectsHandler: ObjectsHandler
  public historyHandler: HistoryHandler
  public templateHandler: TemplateHandler
  public zoomHandler: ZoomHandler
  public scrollbarHandler: ScrollbarHandler
  public propertiesToInclude: string[]
  public personalizationHandler: PersonalizationHandler
  public designHandler: DesignHandler
  public gifHandler: GifHandler
  public guidelinesHandler: GuidelinesHandler
  public backgroundHandler: BackgroundHandler
  public animationHandler: AnimationHandler

  constructor(props: RootHandlerOptions) {
    this.propertiesToInclude = PROPERTIES_TO_INCLUDE
    this.canvas = props.canvas
    const handlerOptions: HandlerOptions = {
      handlers: this,
      canvas: props.canvas,
      context: props.context,
      config: props.config,
      editor: props.editor
    }
    this.canvasHandler = new CanvasHandler(handlerOptions)
    this.frameHandler = new FrameHandler(handlerOptions)
    this.objectsHandler = new ObjectsHandler(handlerOptions)
    this.historyHandler = new HistoryHandler(handlerOptions)
    this.zoomHandler = new ZoomHandler(handlerOptions)
    this.eventsHandler = new EventsHandler(handlerOptions)
    this.personalizationHandler = new PersonalizationHandler(handlerOptions)
    this.templateHandler = new TemplateHandler(handlerOptions)
    this.scrollbarHandler = new ScrollbarHandler(handlerOptions)
    this.designHandler = new DesignHandler(handlerOptions)
    this.gifHandler = new GifHandler(handlerOptions)
    this.guidelinesHandler = new GuidelinesHandler(handlerOptions)
    this.backgroundHandler = new BackgroundHandler(handlerOptions)
    this.animationHandler = new AnimationHandler(handlerOptions)
  }

  destroy = () => {}
}

export default Handlers
