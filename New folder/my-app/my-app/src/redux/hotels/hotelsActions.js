import hotels from '../../hotels.json'
import {FACH_HOTELS,Filter_HOTELS,FECH_HOTELS_SUCCSESS,FECH_HOTELS_FIALUER,FECH_HOTELS_REQUEST,SORT_HOTELS_BY_FEATURES,SORT_HOTELS_BY_PRICE,Filter_HOTELS_BY_PRICE,Filter_HOTELS_BY_ROOM_FEATURES,Filter_HOTELS_BY_STARS_NUMBER, Filter_HOTELS_BY_FEATURES, SORT_HOTELS_BY_STARS} from './types'
import axios from "axios"


// !!!!!FATCH  HOTELS START!!!!!!

 export const reqestFach=()=>{
        return{
            type :FECH_HOTELS_REQUEST
        }
 }
 export const succsessFach=(data)=>{
    localStorage.setItem("hotels",JSON.stringify(data))

        return {
            type:FECH_HOTELS_SUCCSESS,
            pylood:data
        }
 }
 export const fialuerFech=(error)=>{
     return{
         type:FECH_HOTELS_FIALUER,
         pylood:error
     }
 }
  export const fachHotels=(values)=>{
      return(dispatch)=>{
          dispatch(reqestFach())
        axios.get(`http://localhost:8080/reservation/getAvailableHotels/${values.country}/${values.checkIn}/${values.checkOut}`)
        .then(res=>{
        // dispatch(succsessFach(res))
        dispatch( succsessFach({hotels:[...res.data.Hotels],totalItem:0}))
        })
        .catch(error=>{
            // dispatch(fialuerFech(error))
            alert(error)
         dispatch( succsessFach({ hotels:[...hotels],  totalItem:0}))


        })
   
      }
   
}
// !!!!!FATCH  HOTELS END!!!!!!

// !!!!!SORT  HOTELS START!!!!!!

 export const sortHotelsByPrice=(type)=>{
     return{
         type:SORT_HOTELS_BY_PRICE,
         pylood:type

     }
 }
 export const sortHotelsByFeatures=(type)=>{
     return{
         type:SORT_HOTELS_BY_FEATURES,
         pylood:type

     }
 }
 export const sortHotelsByStars=(type)=>{
     return{
         type:SORT_HOTELS_BY_STARS,
         pylood:type

     }
 }

 // !!!!!SORT  HOTELS END!!!!!!

 export const filterHotels=(state)=>{
     return{
         type:Filter_HOTELS,
         pylood:state
     }
 }

 