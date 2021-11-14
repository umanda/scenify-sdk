import * as React from 'react'
import Editor, { useHandlers } from '../../src'
// import { Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
// import { objects } from './objects'
import Text from './objectProps/Text'
import ItemsFactory from './ItemsFactory'
import Navbar from './components/Navbar'
const template = {
  name: 'Untitled design',
  objects: [
    {
      left: 546.5,
      top: 200.04000000000002,
      width: 278.5,
      height: 97.63,
      originX: 'left',
      originY: 'top',
      scaleX: 1,
      scaleY: 1,
      type: 'DynamicText',
      metadata: {
        text: 'Add some {{cc}} body text',
        angle: 0,
        fill: '#000000',
        fontWeight: 'normal',
        charSpacing: 0,
        fontSize: 40,
        fontFamily: 'Times New Roman',
        textAlign: 'left',
        lineHeight: 1.16,
        keyValues: [
          {
            key: '{{cc}}',
            value: 'cc'
          }
        ],
        keys: ['cc']
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

  // const handlerDownload = async () => {
  //   if (handlers) {
  //     const template = await handlers.designHandler.toDataURL({
  //       image: 'https://i.ibb.co/zb6PMP6/logo.png'
  //     })
  //   }
  // }

  // const handleImportTemplate = () => {
  //   if (handlers) {
  //     handlers.templateHandler.importTemplate(template)
  //   }
  // }

  // const addImage = () => {
  //   const options = {
  //     type: 'StaticImage',
  //     metadata: {
  //       src: 'https://i.ibb.co/JB3y2ts/mclogo.jpg'
  //     }
  //   }
  //   handlers?.objectsHandler.create(options)
  // }

  // const addDynamicText = React.useCallback(() => {
  //   if (handlers) {
  //     const objectOptions = {
  //       type: 'DynamicText',
  //       width: 120,
  //       fontSize: 27,
  //       metadata: {
  //         text: 'Add some {{cc}} body text'
  //       }
  //     }
  //     handlers.objectsHandler.create(objectOptions)
  //   }
  // }, [handlers])

  // const addDynamicImage = React.useCallback(() => {
  //   if (handlers) {
  //     const objectOptions = {
  //       width: 100,
  //       height: 100,
  //       backgroundColor: '#bdc3c7',
  //       type: 'DynamicImage',

  //       metadata: {
  //         keyValues: [{ key: '{{' + 'image' + '}}', value: '' }]
  //       }
  //     }
  //     handlers.objectsHandler.create(objectOptions)
  //   }
  // }, [handlers])

  // const exportTemplate = React.useCallback(() => {
  //   if (handlers) {
  //     const template = handlers.templateHandler.exportTemplate()
  //   }
  // }, [handlers])

  // const handleClone = () => {
  //   if (handlers) {
  //     handlers.objectsHandler.clone()
  //   }
  // }
  const editorConfig = {
    clipToFrame: true,
    scrollLimit: 50
  }
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <ItemsFactory />
        <Editor config={editorConfig} />
        <Box sx={{ width: '320px' }}>
          <Text />
        </Box>
      </Box>
    </Box>
  )
}
export default App
