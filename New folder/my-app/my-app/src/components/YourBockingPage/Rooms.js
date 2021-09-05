import React, { useEffect, useState } from 'react'
import Room from './Room'
import hotels from '../../hotels.json'
import InfiniteCarousel from 'react-leaf-carousel';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { setRef } from '@material-ui/core';

function Rooms({stars,orderId}) {
    const [rooms,setRooms]=useState(hotels[0].rooms)
    const [error,setError]=useState("")
    const[loading,setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`http://localhost:8080/reservation/getRooms/${orderId}`)
        .then(res=>{
            setRooms(res.data);
            setLoading(false);
        })
        .catch(error=>{
            setError(error)
        })
    },[])
    return (!loading&&
        <div className='rooms'>
<Container>
          <div className='header'>
         
          </div>
      
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
            slidesToShow={1}
           

            >
                 {
            rooms.map(room=><Room room={room} stars={stars} orderId={orderId}/>)
            }
            </InfiniteCarousel>
           
           
            </Container>
        </div>
    )
}

export default Rooms
