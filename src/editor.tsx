import { fabric } from 'fabric'
import React, { useContext, useEffect, useRef } from 'react'
import { EditorProps, FabricCanvas } from './common/interfaces'
import { EditorContext } from './context'
import Handlers from './handlers'
import ResizeObserver from 'resize-observer-polyfill'
import './objects'
import { defaultEditorConfig } from './common/constants'

function Editor({ config }: EditorProps) {
  const containerRef = useRef(null)
  const context = useContext(EditorContext)
  const { setHandlers } = context

  useEffect(() => {
    const editorConfig = Object.assign(defaultEditorConfig, config)
    const container = (containerRef.current as unknown) as HTMLDivElement
    const { clientHeight, clientWidth } = container

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#f6f7f9',
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true
    }) as FabricCanvas

    const handlers = new Handlers({
      canvas: canvas,
      context: context,
      config: editorConfig
    })
    setHandlers(handlers)
    context.setCanvas(canvas)

    const resizeObserver = new ResizeObserver(entries => {
      const { width = clientWidth, height = clientHeight } = (entries[0] && entries[0].contentRect) || {}
      handlers.canvasHandler.resize(width, height)
    })
    resizeObserver.observe(container)
    return () => {
      handlers.destroy()
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      id="scenify-editor-container"
      ref={containerRef}
      style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}
      >
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}

export default Editor
