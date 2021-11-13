import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { useActiveObject, useHandlers } from '../../../src'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { RgbaColorPicker } from '../components/ColorPicker'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import Position from './components/Position'
import Gradient from './components/Gradient'
function Text() {
  const handlers = useHandlers()
  const [options, setOptions] = React.useState({
    enabled: true,
    offsetX: 15,
    offsetY: 15,
    blur: 0,
    color: 'rgba(0,0,0,0.45)'
  })
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { shadow } = object
    setOptions({ ...options, enabled: !!shadow })
  }
  if (!activeObject) {
    return <Box>Nothing</Box>
  }

  const handleChange = (key: string, value: any) => {
    setOptions({ ...options, [key]: value })
    if (handlers) {
      handlers.objectsHandler.setShadow({ ...options, [key]: value })
    }
  }

  return (
    <Box sx={{ padding: '1rem 1.5rem' }}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>General</Tab>
          <Tab>Metadata</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Accordion sx={{ border: '1px solid rgba(0,0,0,0)' }} allowMultiple>
              <AccordionItem>
                <AccordionButton px={0}>
                  <Box flex="1" textAlign="left">
                    Shadow
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel p={0}>
                  <Box pb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Checkbox
                        isChecked={options.enabled}
                        onChange={() => handleChange('enabled', !options.enabled)}
                      />
                      <Box>Enabled</Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Box>Color</Box>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <RgbaColorPicker
                            onChange={value => handleChange('color', value)}
                            value={options.color}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box pb={2}>
                    <Box>Blur</Box>
                    <Slider
                      onChange={value => handleChange('blur', value)}
                      min={0}
                      max={100}
                      value={options.blur}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                  <Box pb={2}>
                    <Box>Offset X</Box>
                    <Slider
                      onChange={value => handleChange('offsetX', value)}
                      min={-100}
                      max={100}
                      value={options.offsetX}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>

                  <Box pb={2}>
                    <Box>Offset Y</Box>
                    <Slider
                      onChange={value => handleChange('offsetY', value)}
                      min={-100}
                      max={100}
                      value={options.offsetY}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Position />
            <Gradient />
            <Box>
              <Button onClick={() => handlers?.group()}>Group</Button>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
export default Text
