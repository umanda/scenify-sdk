import React from 'react'
import { FC, createContext, useState } from 'react'
import { fabric } from 'fabric'
import Editor from '../Editor'

export interface ContextMenuRequest {
  target: any
  left: number
  top: number
}
export interface IEditorContext {
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
  editor: Editor | null
  setEditor: (handlers: Editor) => void
  zoomRatio: number
  setZoomRatio: (value: number) => void
  contextMenuRequest: ContextMenuRequest
  setContextMenuRequest: (value: ContextMenuRequest) => void
}

export const EditorContext = createContext<IEditorContext>({
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  editor: null,
  setEditor: () => {},
  zoomRatio: 1,
  setZoomRatio: () => {},
  contextMenuRequest: null,
  setContextMenuRequest: () => {}
})

export const EditorProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [contextMenuRequest, setContextMenuRequest] = useState<ContextMenuRequest>(null)
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    editor,
    setEditor,
    zoomRatio,
    setZoomRatio,
    contextMenuRequest,
    setContextMenuRequest
  }

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
}
