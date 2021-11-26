import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { EditorProvider } from '../../src'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { theme } from './theme'
import 'focus-visible'
const extendedTheme = extendTheme(theme)

ReactDOM.render(
  <ChakraProvider>
    <EditorProvider>
      <App />
    </EditorProvider>{' '}
  </ChakraProvider>,
  document.getElementById('root')
)
