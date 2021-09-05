import  {combineReducers} from 'redux'
import hotelsReducer from './hotels/reducer'
import  reducer from './logIn/reducer'
import  reducerOwener from './hotelOwenr/reducerOwener'
const root=combineReducers({myHotels:hotelsReducer,logIn:reducer,OwenerLogIn:reducerOwener})
export default root