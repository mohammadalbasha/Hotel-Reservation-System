import  {FATCH_HOTELS_RECUEST ,FATCH_HOTELS_succsess ,FATCH_HOTELS_error}  from './types'
import axios from 'axios'
import hotels from '../../hotels.json'

export const fatchUserRecuest=()=>{
    return{
        type:FATCH_HOTELS_RECUEST
        
    }
}
export const fatchUserSuccsess=myHotels=>{
    return{
        type:FATCH_HOTELS_succsess,
        paylood:[...hotels,...myHotels]
    }
}
export const fatchUserError=error=>{
    return{
        type:FATCH_HOTELS_error,
        paylood:error
    }
}
export const fatchUsers=()=>{
    return(dispatch)=>{
        dispatch(fatchUserRecuest)
        axios.get("http://localhost/reservation/getHotels")
        .then(res=>{
            dispatch(fatchUsers(res))
        })
        .catch(error=>{
            dispatch(fatchUserError(error))
        })
       
    }
}