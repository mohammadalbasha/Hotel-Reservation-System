
import {Filter_HOTELS,FECH_HOTELS_SUCCSESS,FECH_HOTELS_FIALUER,FECH_HOTELS_REQUEST,SORT_HOTELS_BY_FEATURES,SORT_HOTELS_BY_PRICE,Filter_HOTELS_BY_PRICE,Filter_HOTELS_BY_ROOM_FEATURES,Filter_HOTELS_BY_STARS_NUMBER, Filter_HOTELS_BY_FEATURES, SORT_HOTELS_BY_STARS} from './types'

 const data =JSON.parse(localStorage.getItem("hotels"))
const inituelState={
    loading :false,
    error:"",
    data:data?{...data}:{
        hotels:[],
        totalItem:0}
    ,
    returnHotels:[...data?data.hotels:[]]

}
const hotelsReducer=(state={...inituelState},action)=>{
    
switch(action.type){
    case FECH_HOTELS_REQUEST :
        return {
            ...state,
            loading:true,
            
        }
    case FECH_HOTELS_FIALUER :
        return {
            ...state,

            loading:false,
            error:action.pylood

        }
    case FECH_HOTELS_SUCCSESS :
        return {
            // ...state,
            error:"",
            loading:false,
            data:action.pylood,
            returnHotels:action.pylood.hotels
            

        }


        case SORT_HOTELS_BY_STARS :
            let newHotels=[...state.data.hotels];
            newHotels.sort((a,b)=>action.pylood=="H"?b.stars-a.stars:a.stars-b.stars)
          

            return{
                ...state,
                data:{
                    ...state.data,
                    hotels : [...newHotels]
                }
            }


        case SORT_HOTELS_BY_PRICE :
            var HotelsStorPrice=[...state.data.hotels];
            HotelsStorPrice.sort((a,b)=>action.pylood=="H"?b.rooms[0].price-a.rooms[0].price:a.rooms[0].price-b.rooms[0].price)
            // localStorage.setItem("hotels",JSON.stringify(newHotels))

            return{
                ...state,
                data:{
                    ...state.data,
                    hotels : [...HotelsStorPrice]
                }
            }



            case SORT_HOTELS_BY_FEATURES:
                let HotelsStorfeatures=[...state.data.hotels];

                const numOfFeatures=(hotel)=>{
                    let count=0;
                    for(const feature in hotel.features.hotellFeatures){
                        if(hotel.features.hotellFeatures[feature] ==true)
                        {count++}
                        console.log(count);

                    }
                  
                    return count

                }
                HotelsStorfeatures.sort((a,b)=>action.pylood=="H"?numOfFeatures(b)-numOfFeatures(a):numOfFeatures(a)-numOfFeatures(b))

              return{
                ...state,
                data:{
                    ...state.data,
                    hotels : [...HotelsStorfeatures]
                }
              }
              case Filter_HOTELS_BY_FEATURES:
                let HotelsFilterfeatures=[...state.data.hotels].filter(hotel=>hotel.features.hotellFeatures[action.pylood.feature]);

                  return{
                    ...state,
                    data:{
                        ...state.data,
                        hotels :action.pylood.event? [...HotelsFilterfeatures]:[...state.data.hotels]
                    }
                  }
              case Filter_HOTELS:
                let HotelsFiltes=[...state.returnHotels]
                let features=action.pylood.features
                let roomsFeature=action.pylood.roomsFeature
                let price=action.pylood.price
                let stars=action.pylood.stars
                Object.keys(features).map((feature,value)=>{if(features[feature])  {HotelsFiltes=HotelsFiltes.filter(hotel=>hotel.features.hotellFeatures[feature])}})
                Object.keys(roomsFeature).map((feature,value)=>{if(roomsFeature[feature])  {HotelsFiltes=HotelsFiltes.filter(hotel=>hotel.features.roomFeatures.normal[feature])}})
                HotelsFiltes=HotelsFiltes.filter(hotel=>hotel.rooms[0].price>=price[0]&&hotel.rooms[0].price<=price[1]&&hotel.stars==stars)
                  return{
                    ...state,
                    data:{
                        ...state.data,
                        hotels : [...HotelsFiltes]
                    }
                  
                  }
            //   case Filter_HOTELS_BY_STARS_NUMBER:
            //       return{

            //       }
            //   case Filter_HOTELS_BY_PRICE:
            //       return{

            //       }
        default :return state
}
}
export default hotelsReducer
