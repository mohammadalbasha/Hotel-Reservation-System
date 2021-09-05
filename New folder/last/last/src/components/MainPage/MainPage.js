import React,{useState ,useEffect} from 'react'
import Advantages from './Advantages'
import Chake from './Chake'
import HotelsSall from './HotelsSall'
import Safe from './Safe'
import MainNav from './MainNav'


function MainPage() {

useEffect(() => {
    window.scroll(0,0)
}, [])
    
    return (
        <div className='mainPage'>
          <MainNav/>
            <Chake/>

            <Advantages/>
            <HotelsSall/>

            <Safe/>

         
        </div>
    )
}

export default MainPage
