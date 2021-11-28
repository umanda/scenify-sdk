import * as React from 'react'
import { FC } from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import { EditorProvider } from '../../src'
import { AppProvider } from './contexts/AppContext'
const engine = new Styletron()

const Providers: FC = ({ children }) => {
  return (
    <StyletronProvider value={engine}>
      <EditorProvider>
        <BaseProvider theme={LightTheme}>
          <AppProvider>{children}</AppProvider>
        </BaseProvider>
      </EditorProvider>
    </StyletronProvider>
  )
}

export default Providers
