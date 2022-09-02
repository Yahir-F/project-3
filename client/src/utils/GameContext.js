import React from 'react'
import { Provider } from 'react-redux';
import {createStore} from 'redux'
import reducer from './reducers'

function GameProvider(props) {
  const store = createStore(reducer);
  return (
    <Provider store={store} {...props}/>
  )
}

export default GameProvider