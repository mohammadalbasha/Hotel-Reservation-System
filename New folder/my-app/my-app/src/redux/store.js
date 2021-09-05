import {createStore,applyMiddleware} from 'redux'
import root from './root'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState={}
const store=createStore(root,initialState,composeWithDevTools(applyMiddleware(logger,thunk)))
export default  store