import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { Images, Text } from './components/Icons'
import { useHandlers } from '../../src'

function ItemsFactory() {
  const handlers = useHandlers()

  const addText = () => {
    if (handlers) {
      const options = {
        type: 'StaticText',
        width: 320,
        fontSize: 27,
        metadata: {
          text: 'Add some static body text',
          fontFamily: 'Inconsolata'
        }
      }
      handlers.objectsHandler.create(options)
    }
  }

  const addImage = () => {
    if (handlers) {
      const options = {
        type: 'StaticImage',
        metadata: {
          src: 'https://i.ibb.co/JB3y2ts/mclogo.jpg'
        }
      }
      handlers.objectsHandler.create(options)
    }
  }

  return (
    <Box sx={{ width: '80px' }}>
      <Box
        onClick={addText}
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.2)'
        }}
      >
        <Text size={26} />
      </Box>
      <Box
        onClick={addImage}
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.2)'
        }}
      >
        <Images size={26} />
      </Box>
    </Box>
  )
}

export default ItemsFactory
