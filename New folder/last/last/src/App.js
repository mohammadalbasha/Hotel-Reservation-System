import './App.css';
import Fly_now from './components/Fly_now'
import store from './redux/store'
import {Provider} from 'react-redux'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <Fly_now/>
    </div>
    </Provider>
  );
}

export default App;
