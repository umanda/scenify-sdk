import * as React from 'react'
import { useEditor } from '../../../../../../../../src'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../../../icons'
import useAppContext from '../../../../../../hooks/useAppContext'
import { SubMenuType } from '../../../../../../constants/editor'

function Duplicate() {
  const { setActiveSubMenu } = useAppContext()

  return (
    <Button
      overrides={{
        StartEnhancer: {
          style: {
            marginRight: '8px'
          }
        }
      }}
      startEnhancer={() => <Icons.TimeFast size={24} />}
      onClick={() => setActiveSubMenu(SubMenuType.ANIMATIONS)}
      size={SIZE.compact}
      kind={KIND.tertiary}
    >
      Animate
    </Button>
  )
}

export default Duplicate
