import * as React from 'react'
import { Input } from 'baseui/input'
import Icons from '../../../../../components/icons'
import { Scrollbars } from 'react-custom-scrollbars'
import { useState } from 'react'
import useAppContext from '../../../../../hooks/useAppContext'
import { useEditor } from '../../../../../../../src'

function Panel() {
  const editor = useEditor()
  const [value, setValue] = useState('')
  const { shapes } = useAppContext()
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search elements"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {shapes.map(shape => (
              <div
                key={shape.id}
                style={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px',
                  // background: 'red',
                  display: 'flex',
                  justifyContent: 'center'
                }}
                onClick={() => editor.add({ ...shape, originX: 'center', originY: 'center' })}
              >
                <img
                  width="80px"
                  src={shape.metadata.preview || 'https://via.placeholder.com/150'}
                  alt="preview"
                  height="80px"
                />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel
