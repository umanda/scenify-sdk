import * as React from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import ColorPicker from '../../components/ColorPicker'
import { useState } from 'react'
import { useActiveObject, useHandlers } from '../../../../src'

interface Options {
  angle: number
  colors: string[]
  enabled: boolean
}

function Gradient() {
  const [openItems, setOpenItems] = useState([-1])
  const [options, setOptions] = useState<Options>({
    angle: 0,
    colors: ['#24C6DC', '#514A9D'],
    enabled: false
  })
  const handlers = useHandlers()
  const activeObject = useActiveObject()

  const handleChange = (type: string, value: any) => {
    setOptions({ ...options, [type]: value })
    // if(enabled){

    // }
    if (type === 'enabled') {
      if (value) {
        // console.log({ options })
        console.log('SET GRADIENCT')
        handlers?.objectsHandler.setGradient({ angle: 0, colors: ['#24C6DC', '#514A9D'] })
      }
      // else {
      //   handlers.objectsHandler.updateActive({ strokeWidth: 0 })
      // }
    } else {
      // if (handlers && options.enabled) {
      //   handlers.objectsHandler.updateActive({ [type]: value })
      // }
    }
  }

  const handleEnable = (idx: number) => {
    let enabled = false
    if (idx === 0) {
      enabled = true
    }
    handleChange('enabled', enabled)
    // console.log({ idx })
    setOpenItems([idx])
  }

  return (
    <Box sx={{ padding: '0 1.5rem' }}>
      <Accordion
        sx={{ border: '1px solid rgba(0,0,0,0)' }}
        allowToggle
        index={openItems}
        onChange={handleEnable}
      >
        <AccordionItem>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px'
            }}
          >
            <AccordionButton
              sx={{
                ':hover': {
                  backgroundColor: 'rgba(0,0,0,0)'
                }
              }}
              px={0}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  width: '100%'
                }}
              >
                <Checkbox isChecked={options.enabled} />

                <Box
                  flex="1"
                  textAlign="left"
                  sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', padding: '0.5rem 0' }}
                >
                  Gradient
                </Box>
              </Box>
            </AccordionButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ColorPicker value={options.colors[0]} onChange={() => {}} />
            </Box>
          </Box>
          <AccordionPanel px={0} pt={4}>
            <Box>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>
                Letter spacing
              </Box>
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            <Box>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>
                Letter spacing
              </Box>
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Gradient
