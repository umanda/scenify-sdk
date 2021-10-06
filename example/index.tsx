import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor, { EditorProvider } from '../src';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: '60px', flex: 'none' }}>
        <button className="btn btn-primary">Download</button>
      </div>
      <Editor />
    </div>
  );
};

ReactDOM.render(
  <EditorProvider>
    <App />
  </EditorProvider>,
  document.getElementById('root')
);
