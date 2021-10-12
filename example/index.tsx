import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Editor, { EditorProvider, useHandlers } from '../src'

const template = {
  name: 'Untitled design',
  objects: [
    {
      left: 254.5,
      top: 32.7,
      width: 1311.5,
      height: 814,
      originX: 'left',
      originY: 'top',
      scaleX: 0.54,
      scaleY: 0.54,
      type: 'StaticImage',
      metadata: {
        src: 'https://i.ibb.co/RNvBJhf/1633810829286.png',
        cropX: 193.5,
        cropY: 141
      }
    }
  ],
  background: {
    type: 'color',
    value: '#ffffff'
  },
  frame: {
    width: 1280,
    height: 720
  }
}
const App = () => {
  const handlers = useHandlers()
  // React.useEffect(() => {
  //   if (handlers) {
  //     const object = {
  //       type: 'StaticImage',
  //       metadata: {
  //         src: 'https://i.ibb.co/RNvBJhf/1633810829286.png'
  //       }
  //     }
  //     handlers.objectsHandler.create(object)
  //   }
  // }, [handlers])
  const handlerDownload = async () => {
    if (handlers) {
      const template = await handlers.designHandler.toDataURL()
      console.log(template)
    }
  }

  const handleImportTemplate = () => {
    if (handlers) {
      handlers.templateHandler.importTemplate(template)
    }
  }
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ height: '60px', flex: 'none' }}>
        <button onClick={handleImportTemplate} className="btn btn-primary">
          Import
        </button>
        <button onClick={handlerDownload} className="btn btn-primary">
          Download
        </button>
      </div>
      <Editor />
    </div>
  )
}

ReactDOM.render(
  <EditorProvider>
    <App />
  </EditorProvider>,
  document.getElementById('root')
)
