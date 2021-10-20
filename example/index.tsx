import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Editor, { EditorProvider, useHandlers } from '../src'

const template = {
  name: 'Untitled design',
  objects: [
    {
      left: 598.5,
      top: 212.67000000000002,
      width: 800,
      height: 72.32,
      originX: 'left',
      originY: 'top',
      scaleX: 1,
      scaleY: 1,
      type: 'StaticText',
      metadata: {
        angle: 0,
        fill: '#ffffff',
        fontWeight: 700,
        charspacing: 0,
        fontSize: 64,
        template: 'Hello world',
        fontFamily: 'Lexend',
        textAlign: 'center',
        lineheight: 1.16,
        text: 'Hello world'
      }
    },
    {
      left: 164.87,
      top: 135.32999999999998,
      width: 3800,
      height: 3000,
      originX: 'left',
      originY: 'top',
      scaleX: 0.08,
      scaleY: 0.08,
      type: 'StaticVector',
      metadata: {
        src:
          'https://d2g16cura83u2t.cloudfront.net/illustration/free/additional-file/3360863/3.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkMmcxNmN1cmE4M3UydC5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTYzNDMyMTAxNSwicSI6bnVsbCwiaWF0IjoxNjM0MDYxODE1fQ__.938877ba5f6be19884da9de6758554d5de2644e8ab3ccebe60965b55578f9bda'
      }
    }
  ],
  background: {
    type: 'color',
    value: '#e15f41'
  },
  frame: {
    width: 1500,
    height: 500
  },
  preview: 'https://d3q7mfli5umxdg.cloudfront.net/1634061854515_337318.png',
  id: 'oqGAd5hZeUAH3_-SSvT1w'
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

  const addDynamicText = React.useCallback(() => {
    if (handlers) {
      const objectOptions = {
        type: 'DynamicText',
        width: 120,
        fontSize: 27,
        text: 'Add some body text',
        metadata: {}
      }
      handlers.objectsHandler.create(objectOptions)
    }
  }, [handlers])

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
        <button onClick={addDynamicText} className="btn btn-primary">
          Add dynamic text
        </button>
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
