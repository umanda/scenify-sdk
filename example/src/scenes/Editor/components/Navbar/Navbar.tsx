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
      // editor.toGif({})
      const data = await editor.toGif({})
      if (data) {
        const a = document.createElement('a')
        // @ts-ignore
        a.href = data
        a.download = 'drawing.gif'
        a.click()
      }
    }
  }

  const handleLoadTemplate = async () => {
    const fonts = []
    template.objects.forEach(object => {
      if (object.type === 'StaticText' || object.type === 'DynamicText') {
        fonts.push({
          name: object.metadata.fontFamily,
          url: object.metadata.fontURL,
          options: { style: 'normal', weight: 400 }
        })
      }
    })
    await loadFonts(fonts)
    editor.importFromJSON(template)
  }

  const loadFonts = fonts => {
    const promisesList = fonts.map(font => {
      // @ts-ignore
      return new FontFace(font.name, `url(${font.url})`, font.options).load().catch(err => err)
    })
    return new Promise((resolve, reject) => {
      Promise.all(promisesList)
        .then(res => {
          res.forEach(uniqueFont => {
            // @ts-ignore
            if (uniqueFont && uniqueFont.family) {
              // @ts-ignore
              document.fonts.add(uniqueFont)
              resolve(true)
            }
          })
        })
        .catch(err => reject(err))
    })
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
          <Button onClick={handleLoadTemplate} kind={KIND.secondary}>
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
