import React ,{useState} from 'react'
import Hotlel from './Hotlel'
import hotelsContext from './MainPageAdmin'
 
function Hotels({myhotels ,setHotel}) {
    const [roomsSow,togleRoomsSoe]=useState(false)
    return (
        <div className='hotels'>
            {myhotels.map(hotel=><Hotlel setHotel ={setHotel} roomsSow={roomsSow} togleRoomsSoe={togleRoomsSoe} hotel={hotel}/> )}
        </div>
    )
}

export default Hotels
