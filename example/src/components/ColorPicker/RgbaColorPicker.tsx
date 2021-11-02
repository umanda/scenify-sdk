import * as React from 'react'

import { Box } from '@chakra-ui/react'
import { RgbaColorPicker } from 'react-colorful'
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'

interface ColorPickerProps {
  onChange: (color: any) => void
  value: any | null
}

const rgbaColorParser = function(value) {
  let cache,
    p = parseInt, // Use p as a byte saving reference to parseInt
    color = value.replace(/\s/g, '') // Remove all spaces

  // Checks for 6 digit hex and converts string to integer
  if ((cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color)))
    cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)]
  // Checks for 3 digit hex and converts string to integer
  else if ((cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color)))
    cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17]
  // Checks for rgba and converts string to
  // integer/float using unary + operator to save bytes
  else if ((cache = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color)))
    cache = [+cache[1], +cache[2], +cache[3], +cache[4]]
  // Checks for rgb and converts string to
  // integer/float using unary + operator to save bytes
  else if ((cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))) cache = [+cache[1], +cache[2], +cache[3]]
  // Otherwise throw an exception to make debugging easier
  else throw color + ' is not supported by parseColor'

  // Performs RGBA conversion by default
  isNaN(cache[3]) && (cache[3] = 1)

  // Adds or removes 4th value based on rgba support
  // Support is flipped twice to prevent erros if
  // it's not defined
  return {
    r: cache[0],
    g: cache[1],
    b: cache[2],
    a: cache[3]
  }
}

function ColorPicker({ onChange, value }: ColorPickerProps) {
  const currentColor = rgbaColorParser(value)
  const handleChange = (change: any) => {
    const color = `rgba(${change.r}, ${change.g}, ${change.b}, ${change.a ? change.a : 1})`
    onChange(color)
  }

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
          <Box sx={{ height: '24px', width: '24px', backgroundColor: value, borderRadius: '4px' }}></Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        sx={{
          width: 'inherit',
          padding: '1.5rem'
        }}
      >
        <RgbaColorPicker color={currentColor} onChange={change => handleChange(change)} />
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
