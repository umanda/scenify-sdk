import * as React from 'react'
import { useEditor } from '../../../../../../../../src'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../icons'

function Duplicate() {
  const editor = useEditor()
  return (
    <Button
      onClick={() => {
        editor.clone()
      }}
      size={SIZE.default}
      kind={KIND.tertiary}
      shape={SHAPE.square}
    >
      <Icons.Duplicate size={24} />
    </Button>
  )
}

export default Duplicate
