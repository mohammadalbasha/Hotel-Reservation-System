import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from './Footer';
import OwenerLongIn from './HotelOwners/OwenerLongIn';
import MainOwenerPage from './HotelOwners/MainOwenerPage';
import HotelPage from './HotelPage/HotelPage';
import HotelsPage from './HotelsPage/HotelsPage';
import MainPage from './MainPage/MainPage';
import NavBar from './NavBar';
import SingIn from './SingIn';
import YourBockingPage from './YourBockingPage/YourBockingPage';
import Users from './HotelOwners/Users';
import UserBooking from './HotelOwners/UserBooking';
import Guests from './HotelOwners/Guests';
import SingUp from './SingUp';
import EditFeatures from './HotelOwners/EditFeatures';


function Fly_now() {

    return (
        <Router>
        <>
    

            <Switch>
             <Route path='/' exact>
               <MainPage/>
             </Route>
           
             <Route path='/hotelsPage' exact>
               <HotelsPage/>
             </Route>
             <Route path='/hotelsPage/hotelPage/:id' component={HotelPage} exact/>
             <Route path='/singIn' component={SingIn} exact/>
             <Route path='/singUp' component={SingUp} exact/>
             <Route path='/yourBoocking' component={YourBockingPage} exact/>
             <Route path='/OwenerLongIn' component={OwenerLongIn} exact/>
             <Route path='/MainPageOwener' component={MainOwenerPage} exact/>
             <Route path='/UsersBookThisRoom' component={Users} exact/>
             <Route path='/UserBooking' component={UserBooking} exact/>
             <Route path='/guests' component={Guests} exact/>
             <Route path='/editFeatures' component={EditFeatures} exact/>
              
            </Switch>
            <Footer/>
        </>
        </Router>
    )
}

export default Fly_now
