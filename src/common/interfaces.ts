import { IEditorContext } from '../context/editor';
import Handlers from '../handlers';

export interface FabricWheelEvent {
  e: WheelEvent;
  target?: Object | undefined;
  subTargets?: Object[] | undefined;
  button?: number | undefined;
  isClick?: boolean | undefined;
  pointer?: fabric.IPoint | undefined;
  absolutePointer?: fabric.IPoint | undefined;
  transform?:
    | {
        corner: string;
        original: Object;
        originX: string;
        originY: string;
        width: number;
      }
    | undefined;
}

export interface HandlerOptions {
  root: Handlers;
  context: IEditorContext;
  canvas: FabricCanvas;
}

export interface RootHandlerOptions {
  context: IEditorContext;
  canvas: FabricCanvas;
}

export interface EditorOptions {
  id: string;
  context: any;
}

export interface CanvasOptions {
  width: number;
  height: number;
}

export interface FabricCanvasOption {
  wrapperEl: HTMLElement;
}

export type FabricCanvas<T extends any = fabric.Canvas> = T &
  FabricCanvasOption;

//  Template

export interface Template {
  id: string;
  name: string;
  preview: string;
  background: any;
  frame: {
    width: number;
    height: number;
  };
  objects: any[];
}
