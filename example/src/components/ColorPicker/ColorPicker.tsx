import * as React from 'react'

import { Box } from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'

interface ColorPickerProps {
  onChange: (color: string) => void
  value: string | null
}

function ColorPicker({ onChange, value }: ColorPickerProps) {
  const currentColor = value ? value : 'rgba(255,255,255,0)'
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box
          sx={{
            border: '1px solid rgba(37,40,47,0.25)',
            padding: '0.25rem',
            display: 'flex',
            borderRadius: '4px'
          }}
        >
          <Box
            sx={{ height: '24px', width: '24px', backgroundColor: currentColor, borderRadius: '4px' }}
          ></Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        sx={{
          width: 'inherit',
          padding: '1.5rem'
        }}
      >
        <HexColorPicker color={currentColor} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
