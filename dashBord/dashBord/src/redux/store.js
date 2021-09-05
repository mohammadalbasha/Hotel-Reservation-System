import root from './root'
import {applyMiddleware, createStore} from  'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import {hotelsReducer} from './hotels/hotelsReducer'
const store =createStore(hotelsReducer,composeWithDevTools(applyMiddleware(logger,thunk)))
export default store