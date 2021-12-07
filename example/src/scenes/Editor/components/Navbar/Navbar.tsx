import * as React from 'react'
import { styled, ThemeProvider, DarkTheme } from 'baseui'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../icons'
import Logo from '../../components/icons/Logo'
import { useEditor } from '../../../../../../src'
import Resize from './components/Resize'
import { template } from './template'
const Container = styled('div', props => ({
  height: '70px',
  background: props.$theme.colors.background,
  display: 'flex',
  padding: '0 2rem',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

const LogoContainer = styled('div', props => ({
  color: props.$theme.colors.primary,
  display: 'flex',
  alignItems: 'center'
}))

function NavbarEditor() {
  const editor = useEditor()
  const downloadImage = async () => {
    if (editor) {
      const data = await editor.toPNG({})
      if (data) {
        const a = document.createElement('a')
        a.href = data
        a.download = 'drawing.png'
        a.click()
      }
    }
  }

  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <LogoContainer>
            <Logo size={40} />
          </LogoContainer>
          <Resize />
          <div>
            <Button
              onClick={() => {
                editor.undo()
              }}
              size={SIZE.default}
              kind={KIND.tertiary}
              shape={SHAPE.square}
            >
              <Icons.Undo size={24} />
            </Button>
            <Button
              onClick={() => {
                editor.redo()
              }}
              size={SIZE.default}
              kind={KIND.tertiary}
              shape={SHAPE.square}
            >
              <Icons.Redo size={24} />
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => editor.importFromJSON(template)} kind={KIND.secondary}>
            Load template
          </Button>
          <Button onClick={downloadImage} kind={KIND.primary}>
            Download
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default NavbarEditor
