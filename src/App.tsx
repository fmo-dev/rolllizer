import React from 'react'

import { AuthenticationProvider } from './providers/authentication/provider';
import { APIProvider } from './providers/api/provider';

import './App.scss'
import { Router } from './providers/router';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <APIProvider>
        <AuthenticationProvider>
          <Router />
        </AuthenticationProvider>
      </APIProvider>
    </BrowserRouter>
  )
}

export default App
