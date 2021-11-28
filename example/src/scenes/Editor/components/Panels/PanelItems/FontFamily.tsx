import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from 'baseui/input'
import Icons from '../../../../../components/icons'
import { editorFonts } from '../../../../../constants/editor'
import { useEditor } from '@scenify/sdk'
import { styled } from 'baseui'
function FontFamily() {
  const [value, setValue] = useState('')
  const editor = useEditor()
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 2rem' }}>
        <Input
          startEnhancer={() => <Icons.Search size={18} />}
          value={value}
          onChange={e => setValue((e.target as any).value)}
          placeholder="Search font"
          clearOnEscape
        />
      </div>
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem' }}>
            {editorFonts.map(font => (
              <FontItem
                key={font.name}
                style={{ fontFamily: font.name }}
                onClick={() => editor.update({ fontFamily: font.name })}
              >
                <img src={font.preview || 'https://via.placeholder.com/150'} alt="preview" />
              </FontItem>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

const FontItem = styled('div', props => ({
  cursor: 'pointer',
  padding: '10px 5px 5px 5px',
  ':hover': {
    background: 'rgba(0,0,0,0.045)',
  },
}))
export default FontFamily
