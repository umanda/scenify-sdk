import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { Images, Text, Elements } from './components/Icons'
import { useHandlers, useEditor } from '../../src'
import { objects } from './objects'

function ItemsFactory() {
  const editor = useEditor()

  if (!editor) {
    return <></>
  }

  return (
    <Box sx={{ width: '80px' }}>
      <Box
        onClick={() => editor.add(objects.staticText)}
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        <Text size={26} />
      </Box>

      <Box
        onClick={() => editor.add(objects.staticPath)}
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        <Elements size={26} />
      </Box>
      <Box
        onClick={() => editor.add(objects.staticImage)}
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        <Images size={26} />
      </Box>
    </Box>
  )
}

export default ItemsFactory
