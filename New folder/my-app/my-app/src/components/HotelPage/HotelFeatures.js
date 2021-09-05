import React from 'react'
import { faCoffee, faGamepad, faParking, faShower, faSmoking, faStar, faSwimmingPool, faTree, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';

function HotelFeatures({hotel}) {
    const hotelFeatures= [
        {icon:faTv,name:"Cinama",type:"hasCinema"},
        {icon:faUtensils,name:"Restaurant",type:"hasRestaurant"},
     {icon:faSwimmingPool,name:"SwimmingPool",type:"hasSwimmingPool"},
        {icon:faParking,name:"Parking",type:"hasParking"},
        {icon:faSmoking,name:"Smooking Rooms",type:"hasSmookingRooms"},
       {icon:faGamepad,name:"Games Hall",type:"hasGamesHall"}
   ]
    return (
              <div className='hotelFeaturesSection'>
        <Container fixed>
        <div className='header'>
          {/* <h2>Hotel Features</h2> */}
          </div>
  
        
          <div className='hotelFeatures'>
        {
         hotelFeatures.map((feature)=>
           ( hotel.features.hotelFeatures[feature.type] ? <span>
               <Chip
            size="small"
            icon={<FontAwesomeIcon icon={feature.icon} />}
            label={feature.name}
            color="secondary" />  
           </span> :""  ) 
            )
        }
        
      
        </div>
        
        </Container>
        </div>
     
    )
}

export default HotelFeatures
