import { fabric } from 'fabric';
import React, { useContext, useEffect, useRef } from 'react';
import { FabricCanvas } from './common/interfaces';
import { EditorContext } from './context';
import Handlers from './handlers';
import ResizeObserver from 'resize-observer-polyfill';
import './objects';

function Editor() {
  const containerRef = useRef(null);
  const context = useContext(EditorContext);
  const { setHandlers } = context;

  useEffect(() => {
    const container = (containerRef.current as unknown) as HTMLDivElement;
    const { clientHeight, clientWidth } = container;

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#f6f7f9',
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true,
    }) as FabricCanvas;

    const handlers = new Handlers({
      canvas: canvas,
      context: context,
    });
    setHandlers(handlers);
    context.setCanvas(canvas);

    const resizeObserver = new ResizeObserver(entries => {
      const { width = clientWidth, height = clientHeight } =
        (entries[0] && entries[0].contentRect) || {};
      handlers.canvasHandler.resize(width, height);
    });
    resizeObserver.observe(container);
    return () => {
      handlers.destroy();
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      id="uibox-editor-container"
      ref={containerRef}
      style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      >
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default Editor;
