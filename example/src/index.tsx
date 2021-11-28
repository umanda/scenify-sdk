import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Providers from './Providers'
import Editor from './scenes/Editor'
import Container from './Container'

ReactDOM.render(
  <Providers>
    <Container>
      <Editor />
    </Container>
  </Providers>,
  document.getElementById('root')
)
