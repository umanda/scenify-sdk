import * as React from 'react'
import { Button } from '@chakra-ui/react'

import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'
import { useHandlers } from '../../../../src'

function Position() {
  const handlers = useHandlers()

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button variant="ghost">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button onClick={() => handlers?.objectsHandler.alignTop()} variant="ghost">
          Top
        </Button>
        <Button onClick={() => handlers?.objectsHandler.alignToMiddle()} variant="ghost">
          Middle
        </Button>
        <Button onClick={() => handlers?.objectsHandler.alignBottom()} variant="ghost">
          Bottom
        </Button>

        <Button onClick={() => handlers?.objectsHandler.alignToLeft()} variant="ghost">
          Left
        </Button>
        <Button onClick={() => handlers?.objectsHandler.alignToCenter()} variant="ghost">
          Center
        </Button>
        <Button onClick={() => handlers?.objectsHandler.alignToRight()} variant="ghost">
          Right
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default Position
