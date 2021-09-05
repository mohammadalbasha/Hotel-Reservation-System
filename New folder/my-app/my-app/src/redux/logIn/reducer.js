import { LOG_IN ,LOG_IN_REQUES ,LOG_IN_FIALUER,LOG_IN_SUCCSESS} from "./type";

const inituelState={
    loading :false,
    error:"",
    token:""  

}
const reducer=(state={...inituelState},action)=>{
    switch (action.type){
        case LOG_IN_REQUES :
            return {
                ...state,
                loading:true,
                
            }
        case LOG_IN_FIALUER :
            return {
                ...state,
    
                loading:false,
                error:action.pylood
    
            }
        case LOG_IN_SUCCSESS :
            return {
                // ...state,
                error:"",
                loading:false,
                token:action.pylood
                
    
            }
            default :
            return{
                ...state
            }
    
    
    }
}
export default reducer