import {
  // FabricCanvas,
  HandlerOptions,
  RootHandlerOptions,
} from '../common/interfaces';
import { PROPERTIES_TO_INCLUDE } from '../common/constants';
import CanvasHandler from './CanvasHandler';
import EventsHandler from './EventsHandler';
import FrameHandler from './FrameHandler';
import ObjectHandler from './ObjectsHandler';
import TransactionHandler from './TransactionHandler';
import ZoomHandler from './ZoomHandler';
import PersonalizationHandler from './PersonalizationHandler';
import TemplateHandler from './TemplateHandler';
import ScrollbarHandler from './ScrollbarHandler';
class Handlers {
  public frameHandler: FrameHandler;
  public eventsHandler: EventsHandler;
  public canvasHandler: CanvasHandler;
  public objectsHandler: ObjectHandler;
  public transactionHandler: TransactionHandler;
  public templateHandler: TemplateHandler;
  public zoomHandler: ZoomHandler;
  public scrollbarHandler: ScrollbarHandler;
  // public canvas: FabricCanvas;
  public propertiesToInclude: string[];
  public personalizationHandler: PersonalizationHandler;
  constructor(props: RootHandlerOptions) {
    this.propertiesToInclude = PROPERTIES_TO_INCLUDE;
    const handlerOptions: HandlerOptions = {
      root: this,
      canvas: props.canvas,
      context: props.context,
    };
    this.canvasHandler = new CanvasHandler(handlerOptions);
    this.frameHandler = new FrameHandler(handlerOptions);
    this.objectsHandler = new ObjectHandler(handlerOptions);
    this.transactionHandler = new TransactionHandler(handlerOptions);
    this.zoomHandler = new ZoomHandler(handlerOptions);
    this.eventsHandler = new EventsHandler(handlerOptions);
    this.personalizationHandler = new PersonalizationHandler(handlerOptions);
    this.templateHandler = new TemplateHandler(handlerOptions);
    this.scrollbarHandler = new ScrollbarHandler(handlerOptions);
  }

  destroy = () => {};
}

export default Handlers;
