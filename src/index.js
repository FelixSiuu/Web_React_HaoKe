import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux'
import store ,{ persistor } from './redux/store.js'
import App from './App.js'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
 document.getElementById('root'))