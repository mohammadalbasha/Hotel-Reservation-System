import React ,{useEffect}from 'react'
import {useSelector} from 'react-redux'
import Corona from '../Corona'
import BaseInfo from './BaseInfo'
import Slider from './Slider'
import Map from './Map'
import Feature from './Feature'
import Rooms from './Rooms'
import { Button  } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar'
import CheckPar from '../CheckPar'
import Reviews from './Reviews'
function HotelPage({match}) {
    const hotels=useSelector(state=>state.myHotels.data.hotels)
    const hotel=hotels.filter(hotel=>hotel._id==match.params.id)[0]
  
  
useEffect(() => {
    window.scroll(0,0)
}, [])
    return (
        <div className='hotelPage '>
          <NavBar/>
          <CheckPar/>

            {/* <div className='row'> */}
            {/* <div className='col-1'></div> */}
           
            <div className='hotelInformation '>
                <div>
            <Container fixed>
            <Corona/>

           
            <div className='row mt-4 mb-4 bg-lg-light p-0 m-0'>
            <Slider hotel={hotel}/>
            <div className='col text-center'>
            <BaseInfo hotel={hotel}/>
            <Feature hotel={hotel}/>
            <Map hotel={hotel}/>
            <Reviews notes={hotel.notes}/>
           

            </div >
         
           
            
           
            </div>
        </Container>
            </div>
            <Rooms hotel={hotel } stars={hotel.stars}/>
            </div>
        
            </div>
        // </div>
    )
}

export default HotelPage
