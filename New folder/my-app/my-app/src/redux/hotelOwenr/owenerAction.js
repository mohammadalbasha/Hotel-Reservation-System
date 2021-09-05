import { LOG_IN ,OwenerLOG_IN_REQUES ,OwenerLOG_IN_FIALUER,OwenerLOG_IN_SUCCSESS} from "./type";
import axios from "axios"
import hotels from '../../hotels.json'
export const reqestLogIn=()=>{
    return{
        type :OwenerLOG_IN_REQUES
    }
}
export const succsessLogIn=(data)=>{
  //   localStorage.setItem("hotelOwener",data.hotel)
    localStorage.setItem("tokenOwener",data.token)
    return {
        type:OwenerLOG_IN_SUCCSESS,
        pylood:data
    }
}
export const fialuerLogIn=(error)=>{
 return{
     type:OwenerLOG_IN_FIALUER,
     pylood:error
 }
}

export const owenerlogIN=(id)=>{
    return(dispatch)=>{
        dispatch(reqestLogIn())
      axios.post('http://localhost:8080/auth/owner/login',{ownerCode:id})
      .then(res=>{
      dispatch(succsessLogIn(res.data))
      })
      .catch(error=>{
           dispatch(fialuerLogIn(error))
//       dispatch( succsessLogIn({token:"123",hotel:{...hotels[0]}}))


      })
 
    }
 
}