import { IEditorContext } from '../context/editor'
import Editor from '../Editor'
import Handlers from '../handlers'

export interface FabricWheelEvent {
  e: WheelEvent
  target?: Object | undefined
  subTargets?: Object[] | undefined
  button?: number | undefined
  isClick?: boolean | undefined
  pointer?: fabric.IPoint | undefined
  absolutePointer?: fabric.IPoint | undefined
  transform?:
    | {
        corner: string
        original: Object
        originX: string
        originY: string
        width: number
      }
    | undefined
}

// export interface RootHandlerOptions
export interface HandlerOptions {
  handlers: Handlers
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}
export interface IHandler {
  handlers: Handlers
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface RootHandlerOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface EditorOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  // editor: Editor
}

// export interface EditorConfig {
//   config: {
//     clipToFrame: boolean
//     scrollLimit: number
//   }
// }

export interface CanvasOptions {
  width: number
  height: number
}

export interface FabricCanvasOption {
  wrapperEl: HTMLElement
}

export type FabricCanvas<T extends any = fabric.Canvas> = T & FabricCanvasOption

//  Template

export interface Template {
  id: string
  name: string
  preview: string
  background: any
  frame: {
    width: number
    height: number
  }
  objects: any[]
}

export interface EditorConfig {
  clipToFrame: boolean
  scrollLimit: number
}

// export interface EditorConfig {
//   clipToFrame: boolean
//   scrollLimit: number
// }

export interface GradientOptions {
  angle: number
  colors: string[]
}

export interface ShadowOptions extends fabric.IShadowOptions {
  enabled: boolean
}
