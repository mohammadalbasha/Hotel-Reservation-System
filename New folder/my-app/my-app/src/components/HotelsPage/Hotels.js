import React,{useEffect} from 'react'
import HotelCart from './HotelCart'
import {useDispatch,useSelector} from "react-redux"
import Filter from './Filter'
import { CircularProgress ,Divider} from '@material-ui/core'
import Corona from '../Corona'
import { Alert } from '@material-ui/lab'

function Hotels() {
    const hotels=useSelector(state=>state.myHotels.data.hotels)
    const loading=useSelector(state=>state.myHotels.loading)
    const error=useSelector(state=>state.myHotels.error)
   
    console.log(hotels)
    return (
        <div className='hotels  col-md-8 col-sm-8'>
               <Filter/>
              
               {/* <Divider/> */}
               <Corona/>

           {
               loading?<div className='loading'><CircularProgress/>
               </div>:
               error?
               <Alert severity="error">
                There is something wrong <strong>{error.message}</strong>
                </Alert>:
               hotels?
               <div className='hotelCarts'>
                   {
                       hotels.map(hotel=><HotelCart hotel={hotel}/>)
                   }
               </div>:""
           }
        </div>
    )
}

export default Hotels
