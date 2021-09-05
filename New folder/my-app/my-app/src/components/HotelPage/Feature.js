import React from 'react'
import { faCoffee, faGamepad, faParking, faShower, faSmoking, faStar, faSwimmingPool, faTree, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from '@material-ui/core/Chip';

import HotelFeatures from './HotelFeatures';
import RoomFearurwes from './RoomFearurwes';

function Feature({hotel}) {
   
  

    return (
        <>     
        <div className='features'>
        <HotelFeatures hotel={hotel}/>
        {/* <RoomFearurwes hotel={hotel}/> */}

        </div>
       
         
</>
    )
}

export default Feature
