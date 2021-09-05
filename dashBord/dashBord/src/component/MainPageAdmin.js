import React,{useState ,useEffect} from 'react'
import NavBar from './Navbar'
import axios from 'axios'
import Navigation from './Navigation'
import Hotels from './Hotels'
import hotels from '../hotels.json'
import {BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom'



function MainPageAdmin({setToken,setHotels,myhotels,token}) {

    const [error,setError] =useState();

    axios.get("http://localhost:8080/admin/getHotels",{
        headers :{"authorization" :`Bearer ${token}`   }
        }
    )
    .then(res=>{
        setHotels(res.data);
        localStorage.setItem('myhotels',res.data);
    })
    .catch(error=> {
            alert(error);
            setToken(null);
            localStorage.removeItem("token");
            setError(error);

            
        
    })
   
    if (error){
        return <Redirect to='/' />

    }
    return (
        <div className='mainPageAdmin'>
            <NavBar/>
            <Navigation/>
            <Hotels  myhotels={myhotels}/>
        </div>
    )
}

export default MainPageAdmin
