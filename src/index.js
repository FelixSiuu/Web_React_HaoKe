import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
 document.getElementById('root'))