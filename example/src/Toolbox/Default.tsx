import * as React from 'react'
import { Box, Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'
import formatSizes from '../constants/format-sizes'
import { useEditor } from '../../../src'
import ColorPicker from '../components/ColorPicker'

function Default() {
  const editor = useEditor()
  return (
    <Box sx={{ padding: '2rem' }}>
      <Box>
        <ColorPicker onChange={color => editor?.background.setBackgroundColor(color)} value="#000000" />
      </Box>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" isFullWidth={true}>
            1200 x 1200 px
          </Button>
        </PopoverTrigger>
        <PopoverContent sx={{ borderColor: 'red', width: '256px', padding: '0.5rem 0', borderRadius: 0 }}>
          {formatSizes.map((format, index) => {
            return (
              <Box
                sx={{
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1rem',
                  cursor: 'pointer'
                }}
                _hover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                onClick={() => {
                  editor?.frame.setSize(format.size)
                }}
                key={index}
              >
                {format.description}
              </Box>
            )
          })}
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Default
