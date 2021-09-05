import React from 'react'
import { faCoffee, faGamepad, faParking, faShower, faSmoking, faStar, faSwimmingPool, faTree, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import HotelFeatures from './HotelFeatures';
function RoomFearurwes({hotel}) {

   const roomFeatures=[
    {icon:faWifi,name:"Free Wifi",type:"hasFreeWifi"},
    {icon:faShower,name:"Jacuzzi",type:"hasJacuzzi"},
 {icon:faCoffee,name:"Coffee Machine",type:"hasCoffeeMachine"},
    {icon:faTree,name:"Balcony",type:"hasBalcony"},
    {icon:faSmoking,name:"Smooking Rooms",type:"hasSmookingRooms"},
   {icon:faGamepad,name:"Games Hall",type:"hasGamesHall"}
]
    return (
        <div className='roomsFeatureSection'>
            <Container fixed>
            <div className='header'>
          <h2>Rooms Features</h2>
          </div>
               <div className='roomsFeature'>
        <div className='normal'>
            <h6>Normal Rooms</h6>
            {
         roomFeatures.map((feature)=>
           ( hotel.features.roomFeatures.normal[feature.type] ? <li className='feature'>
<i><FontAwesomeIcon   icon={feature.icon}/></i>
               <p>{feature.name}</p>
                
           </li>:""  ) 
            )
        }
        </div>
        <div className='vip'>
        <h6>Vip Rooms</h6>
     
        {roomFeatures.map((feature)=>
           ( hotel.features.roomFeatures.vip[feature.type] ? <li className='feature'>
<i><FontAwesomeIcon   icon={feature.icon}/></i>
               <p>{feature.name}</p>
           </li>:""  ) 
            )
        }  
        </div>
        <div className='sweet'>
        <h6>Sweet Rooms</h6>

        {roomFeatures.map((feature)=>
           ( hotel.features.roomFeatures.sweet[feature.type] ? <li className='feature'>
<i><FontAwesomeIcon   icon={feature.icon}/></i>
               <p>{feature.name}</p>
           </li>:""  ) 
            )
        }  
        </div>
        </div>
        </Container>
        </div>
     
    )
}

export default RoomFearurwes
