import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import GraphicLine from './Svg/graphicLine'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import Slider from '../HotelPage/Slider'
import InfiniteCarousel from 'react-leaf-carousel';
import Room from './Room'
import OwenerNav from './OwenerNav'
import Reviews from './Reviews'
function MainOwenerPage() {
  const hotel=useSelector(state=>state.OwenerLogIn.hotel)
  const [error,setError]=useState("")
    const [data,setData]=useState([{"label":"Jan","x":2,"y":1},{"label":"Feb","x":4,"y":1.3},{"label":"Mar","x":6,"y":1.7},{"label":"Apr","x":8,"y":2},{"label":"May","x":10,"y":1.5},{"label":"Jun","x":12,"y":2.8},{"label":"Jul","x":14,"y":3},{"label":"Aug","x":16,"y":3},{"label":"Sep","x":18,"y":3.5},{"label":"Oct","x":20,"y":4},{"label":"Nov","x":22,"y":4},{"label":"Dec","x":24,"y":3.5}]);
    useEffect(()=>{
      window.scroll(0,0)

        axios.get("url")
        .then(data=>{
            setData(data)
        })
        .catch(error=>{
            setError(error)

        })

        
    },[])
    return (
        <div className='mainOwenerPage' >
          <OwenerNav/>
           {/* <img src={hotel.imagesUrl[0]}></img> */}
           <div className='hotelInfo row mt-5 pt-4'>
              <div className='info col-5'>
                   <h3>{hotel.name}</h3>
                   <p>  <i> <FontAwesomeIcon icon={faMapMarker}/></i>{hotel.country}</p>
                   {/* <Slider hotel={hotel}/>  */}
               </div>
               <div className='chart col-8 p-0 m-0'>   <GraphicLine data={data}/></div>
            
           </div>
           <div className='rooms  '>


           <InfiniteCarousel
              breakpoints={[
            
                {
                  breakpoint: 767.98,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 991.98,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ]}
            slidesToShow={3}
           

            >
                 {
                hotel.rooms.map(room=>
                  <Room room={room}/>

  
                    )
            }
            </InfiniteCarousel>

           
             
           </div>
           <Reviews notes={hotel.notes}/>

        
           
        </div>
    )
}

export default MainOwenerPage
