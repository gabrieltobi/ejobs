import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import { firebaseImpl } from './config/firebase'

ReactDOM.render(<Root />, document.getElementById('app'))

module.hot && module.hot.accept()