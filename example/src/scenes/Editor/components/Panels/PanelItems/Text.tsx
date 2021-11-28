import * as React from 'react'

import { useEditor } from '../../../../../../../src'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '../../../../../components/icons'
import { useState } from 'react'

function Panel() {
  const [value, setValue] = useState('')
  const editor = useEditor()

  const addHeading = () => {
    const options = {
      type: 'StaticText',
      width: 800,
      metadata: {
        fontWeight: 700,
        fontFamily: 'Lexend',
        textAlign: 'center',
        fontSize: 80,
        value: 'Add a heading'
      }
    }
    editor.add(options)
  }

  const addSubheading = () => {
    const options = {
      type: 'StaticText',
      width: 800,
      metadata: {
        value: 'Add a subheading',
        fontSize: 60,
        fontWeight: 500,
        fontFamily: 'Lexend',
        textAlign: 'center'
      }
    }
    editor.add(options)
  }

  const addTextBody = () => {
    const options = {
      type: 'StaticText',
      width: 800,
      metadata: {
        value: 'Add a little bit of body text',
        fontSize: 40,
        fontWeight: 300,
        fontFamily: 'Lexend',
        textAlign: 'center'
      }
    }
    editor.add(options)
  }
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search text"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '50px 50px 50px',
              padding: '0 2rem',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1.66rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              onClick={addHeading}
            >
              Add a heading
            </div>
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1.12rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onClick={addSubheading}
            >
              Add a subheading
            </div>
            <div
              style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '0.76rem',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.045)',
                fontWeight: 300,
                cursor: 'pointer'
              }}
              onClick={addTextBody}
            >
              Add a litle bit of body text
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel
