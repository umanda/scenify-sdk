import Icons from '../../../icons'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { Slider } from 'baseui/slider'
import { useActiveObject, useEditor } from '@scenify/sdk'
import { useEffect, useState } from 'react'

function Opacity() {
  const [value, setValue] = useState([1])
  const activeObject = useActiveObject()
  const editor = useEditor()
  useEffect(() => {
    updateOptions(activeObject)
  }, [activeObject])

  useEffect(() => {
    editor.on('history:changed', () => {
      updateOptions(activeObject)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  const updateOptions = (object: fabric.IObjectOptions) => {
    const updatedValue = [object.opacity * 100]
    setValue(updatedValue)
  }

  const updateOpacity = (value: number[]) => {
    const opacityValue = value[0] / 100
    editor.update({ opacity: opacityValue })
  }

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div
          style={{
            width: '380px',
            background: '#ffffff',
            fontFamily: 'Uber Move Text',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '1.5rem 2rem',
              alignItems: 'center',
            }}
          >
            <div>Transparency</div>
            <Slider
              overrides={{
                InnerThumb: () => null,
                ThumbValue: () => null,
                TickBar: () => null,
                Thumb: {
                  style: {
                    height: '20px',
                    width: '20px',
                  },
                },
              }}
              min={0}
              max={100}
              marks={false}
              value={value}
              onChange={({ value }) => updateOpacity(value)}
            />
            <div>{Math.round(value[0])}</div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.default} kind={KIND.tertiary} shape={SHAPE.square}>
        <Icons.Opacity size={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Opacity
