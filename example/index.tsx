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

  const addImage = () => {
    const options = {
      type: 'StaticImage',
      metadata: {
        src:
          'https://pixabay.com/get/gbb0b07d5209d35482d415bc979a3b78087dab03e86f590cc3af0315eaca9077d3743fbd5aa28a418460c2833e6c4acd6_640.jpg'
      }
    }
    handlers?.objectsHandler.create(options)
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
        <button onClick={addImage} className="btn btn-primary">
          Add image
        </button>
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
