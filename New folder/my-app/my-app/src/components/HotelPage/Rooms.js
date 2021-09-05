import React from 'react'
import Room from './Room'

import InfiniteCarousel from 'react-leaf-carousel';
import Container from '@material-ui/core/Container';

function Rooms({hotel,stars}) {
    return (
        <div className='rooms'>
<Container>
          <div className='header'>
          <h2>Our Rooms</h2>
          <p>Lorem ipsum dolor sit amet concateur non troppo di saronno la prada</p>
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
            slidesToShow={3}
           

            >
                 {
                hotel.rooms.map(room=><Room room={room} stars={stars}/>)
            }
            </InfiniteCarousel>
           
           
            </Container>
        </div>
    )
}

export default Rooms
