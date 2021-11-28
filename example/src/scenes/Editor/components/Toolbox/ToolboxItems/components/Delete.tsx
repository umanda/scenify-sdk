import * as React from 'react'
import { useEditor } from '../../../../../../../../src'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../icons'

function Delete() {
  const editor = useEditor()
  return (
    <Button onClick={() => editor.delete()} size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
      <Icons.Delete size={24} />
    </Button>
  )
}

export default Delete
