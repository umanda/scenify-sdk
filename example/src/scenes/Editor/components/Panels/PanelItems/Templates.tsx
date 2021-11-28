import * as React from 'react'

import useAppContext from '../../../../../hooks/useAppContext'
import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '../../../../../components/icons'
import { useEditor } from '../../../../../../../src'

function Templates() {
  const editor = useEditor()
  const { templates } = useAppContext()
  const [value, setValue] = useState('')
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search templates"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {templates.map(template => (
              <div
                key={template.id}
                style={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.2)',
                  padding: '5px'
                }}
                onClick={() => editor.importFromJSON(template)}
              >
                <img width="100%" src={template.preview || 'https://via.placeholder.com/150'} alt="preview" />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Templates
