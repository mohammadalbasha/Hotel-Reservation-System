import { LOG_IN ,OwenerLOG_IN_REQUES ,OwenerLOG_IN_FIALUER,OwenerLOG_IN_SUCCSESS} from "./type";


const inituelState={
    loading :false,
    error:"",
    token:localStorage.getItem('tokenOwener')||"",
    hotel:{...JSON.parse( localStorage.getItem("hotelOwener"))||{}}  

}
const reducerOwener=(state={...inituelState},action)=>{
    switch (action.type){
        case OwenerLOG_IN_REQUES :
            return {
                ...state,
                loading:true,
                
            }
        case OwenerLOG_IN_FIALUER :
            return {
                ...state,
    
                loading:false,
                error:action.pylood
    
            }
        case OwenerLOG_IN_SUCCSESS :
            return {
                // ...state,
                error:"",
                loading:false,
                token:action.pylood.token,
                hotel:action.pylood.hotel
                
    
            }
            default :
            return{
                ...state
            }
    
    
    }
}
export default reducerOwener