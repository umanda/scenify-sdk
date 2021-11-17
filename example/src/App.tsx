import * as React from 'react'
import Editor, { useContextMenuRequest, useHandlers } from '../../src'
// import { Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
// import { objects } from './objects'
import Text from './objectProps/Text'
import ItemsFactory from './ItemsFactory'
import Navbar from './components/Navbar'

const App = () => {
  // const handlers = useHandlers()
  const contextMenuRequest = useContextMenuRequest()

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
        <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
          {contextMenuRequest && (
            <Box
              // @ts-ignore
              onContextMenu={(e: Event) => e.preventDefault()}
              sx={{
                position: 'absolute',
                top: `${contextMenuRequest.top}px`,
                left: `${contextMenuRequest.left}px`,
                zIndex: 129,
                width: '240px',
                height: '240px',
                backgroundColor: 'blue'
              }}
            >
              <Box sx={{ height: '20px', backgroundColor: 'red' }} onClick={() => console.log('CLIKED')}>
                Hello
              </Box>
            </Box>
          )}
          <Editor config={editorConfig} />
        </Box>
        <Box sx={{ width: '320px' }}>
          <Text />
        </Box>
      </Box>
    </Box>
  )
}
export default App
