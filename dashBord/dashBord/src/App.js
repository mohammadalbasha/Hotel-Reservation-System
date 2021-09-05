import React ,{useState} from 'react'
import AddHotel from "./component/AddHotel";
import AddNewAdmin from "./component/AddNewAdmin";
import LoginPage from "./component/LogInPage";
import MainPageAdmin from "./component/MainPageAdmin";
import {BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom'
import hotels from './hotels.json'
import HotelPage from './component/HotelPage';
import RoomEdit from './component/RoomEdit';
import HotelEdit from './component/HotelEdit';
import FeaturesEdit from './component/FeaturesEdit';
import Users from './component/Users';
export const hotelsContext=React.createContext()

function App() {
  
  const [token,setToken]=useState('')
  const [myhotels ,setHotels]=useState([]) ;
  const [hotelId,setHotelId] = useState();
  const [hotel , setHotel] = useState();

  if (!token&&localStorage.getItem('token'))
setToken( localStorage.getItem('token'));
//  alert("lskdmclkmscd" + token)  
  return (
    <div className="App">

        <Router>
          <Switch>
         
          <Route path='/' exact > {token? <Redirect to='/mainPageAdmin'/>:
          <Route path='/' exact  render={()=><LoginPage setToken = {setToken} />} />}</Route>
          <Route path='/' exact render={()=><LoginPage />} />
          <Route path='/mainPageAdmin'  exact render={()=><MainPageAdmin  setToken = {setToken} myhotels={myhotels} setHotels={setHotels} token={token} />}/>
          <Route path='/mainPageAdmin/addNewAdmin' exact render={()=><AddNewAdmin setToken = {setToken}  token={token}/>} />
          <Route path='/mainPageAdmin/addHotel' exact render={()=><AddHotel setToken = {setToken}  token={token}/>} />
          <Route path='/hotelPage/hotelEdit/:id' exact render={()=><HotelEdit setToken = {setToken}  token={token}/>} />
          <Route path='/hotelPage/featuresEdit/:id' exact render={()=><FeaturesEdit setToken = {setToken}  token={token} />}/>
          <Route path='/hotelPage/roomEdit/:id' exact component={()=>RoomEdit(token)}/>
        <Route path='/hotelPage/Users' exact component={()=>Users(token)}></Route>
          <Route path='/hotelPage/:id' exact component={()=><HotelPage token={token}/>}/>
         
          </Switch>
          </Router>
         
    </div>

  );
}

export default App;
