import React from 'react';
import './App.css';
import AppLayout from './AppLayout';
import IndexSettings from './Settings/indexSettings';
import AppBar from './AppBar'
import {AppProvider} from './AppProvider'

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <IndexSettings />
      </AppProvider>
    </AppLayout>
  );
}

export default App;
