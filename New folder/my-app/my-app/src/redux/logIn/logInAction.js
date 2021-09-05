import { LOG_IN ,LOG_IN_REQUES ,LOG_IN_FIALUER,LOG_IN_SUCCSESS} from "./type";
import axios from "axios"

export const reqestLogIn=()=>{
    return{
        type :LOG_IN_REQUES
    }
}
export const succsessLogIn=(token)=>{
    localStorage.setItem("token",token);

    return {
        type:LOG_IN_SUCCSESS,
        pylood:token
    }
}
export const fialuerLogIn=(error)=>{
 return{
     type:LOG_IN_FIALUER,
     pylood:error
 }
}

export const logIN=(values)=>{
    return(dispatch)=>{
        dispatch(reqestLogIn())
      axios.post('http://localhost:8080/auth/login',values)
      .then(res=>{
      dispatch(succsessLogIn(res.data.token))
    //   dispatch( succsessLogIn("1223"))
      })
      .catch(error=>{
          alert(error)
            dispatch(fialuerLogIn(error))

    //   dispatch( succsessLogIn("1223"))

      })
 
    }
 
}