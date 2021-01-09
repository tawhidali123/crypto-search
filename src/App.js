import React from 'react';
import './App.css';
import AppLayout from './AppLayout';
import IndexSettings from './Settings/indexSettings';
import AppBar from './AppBar'
import {AppProvider} from './AppProvider'
import Content from './Shared/Content'

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />

        <Content>
          <IndexSettings />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
