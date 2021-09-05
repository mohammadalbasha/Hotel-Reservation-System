import  {FATCH_HOTELS_RECUEST ,FATCH_HOTELS_succsess ,FATCH_HOTELS_error}  from './types'
const initialState={
    looding:false,
    hotels:[],
    error:''
}
export const hotelsReducer=(state={...initialState},action)=>{

    switch(action.type){
        case FATCH_HOTELS_RECUEST :
            return{
                ...state,
                looding:true,
               
            }
            case FATCH_HOTELS_error:
                return{
                    ...state,
                    looding:false,
                    error:action.paylood
                }
                case FATCH_HOTELS_succsess:
                    return{
                        ...state,
                        looding:false,
                        hotels:action.paylood

                    }
    }
}
