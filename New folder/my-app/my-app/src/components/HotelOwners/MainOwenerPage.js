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
import { Redirect,useHistory } from 'react-router'

function MainOwenerPage() {
  const [hotel,setHotel] = useState(useSelector(state=>state.OwenerLogIn.hotel||{}))
  const [error,setError]=useState("")
  const [data,setData]=useState([{"label":"Jan","x":2,"y":1},{"label":"Feb","x":4,"y":1.3},{"label":"Mar","x":6,"y":1.7},{"label":"Apr","x":8,"y":2},{"label":"May","x":10,"y":1.5},{"label":"Jun","x":12,"y":2.8},{"label":"Jul","x":14,"y":3},{"label":"Aug","x":16,"y":3},{"label":"Sep","x":18,"y":3.5},{"label":"Oct","x":20,"y":4},{"label":"Nov","x":22,"y":4},{"label":"Dec","x":24,"y":3.5}]);
  const [loading1,setL1] = useState(true);
  const [loading2,setL2] = useState(true);
  const token = localStorage.getItem('tokenOwener');
  const history = useHistory();

  useEffect(()=>{
      window.scroll(0,0)
        axios.get("http://localhost:8080/owner/getHotelReservationSummary",{
          headers : {
            'Authorization' : `bearer ${token}`
          }
        })
        .then(res=>{
            setData(res.data);
            console.log(res.data);
            setL2(false);

        })
        
        .catch(error=>{
            setError(error);
            localStorage.removeItem('tokenOwener');

history.push("/OwenerLongIn");
        })

        
    },[])

    
    useEffect(()=>{
        axios.get("http://localhost:8080/owner/getHotel",{
          headers : {
            'Authorization' : `bearer ${token}`
          }
        })
        .then(res=>{
            setHotel(res.data);
            console.log(res.data)
            setL1(false);

        })
        
        .catch(error=>{

            setError(error);
            localStorage.removeItem('tokenOwener');
            history.push("/OwenerLongIn");


        })

        
    },[])
    return (
      !loading1&&
        <div className='mainOwenerPage' >
          <OwenerNav featuresId = {hotel.features._id}/>
           {/* <img src={hotel.imagesUrl[0]}></img> */}
           <div className='hotelInfo row mt-5 pt-4'>
              <div className='info col-5'>
                   <h3>{hotel.name}</h3>
                   <p>  <i> <FontAwesomeIcon icon={faMapMarker}/></i>{hotel.country}</p>
                   {/* <Slider hotel={hotel}/>  */}
               </div>
              {!loading2&& <div className='chart col-8 p-0 m-0'>   <GraphicLine data={data}/></div>}
            
           </div>
           <div className='Owenerrooms  '>


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
                 {!loading1&&
                hotel.rooms.map(room=>
                  <Room room={room}/>

  
                    )
            }
            </InfiniteCarousel>

           
             
           </div>
           <Reviews/>

        
           
        </div>
    )
}

export default MainOwenerPage
