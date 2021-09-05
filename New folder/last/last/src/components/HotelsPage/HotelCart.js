import { faPoll, faStar, faSwimmingPool, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip } from '@material-ui/core';
import React from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { Carousel } from 'react-bootstrap';

function HotelCart({hotel}) {
    let k=[];
    for(let i=0;i<hotel.stars;i++){
        k.push("")
    }
    return (
        <Fade  >
        <div className='hotelCart row'>
        
            <div className='cartImg col-md-4  '>
            <div className='slider'>


    <Carousel>
  {hotel.imagesUrl.map(e=> 
  <Carousel.Item>
  <img
    className="d-block w-100"
    src={e}      alt={e}
  />
    </Carousel.Item> 
   )}
    
   
</Carousel>

         
                </div>                
            </div>
            <div className='cartInfo col-md-5'>
                <h2>{hotel.name}</h2>
                <p>{hotel.country}</p>
                <div className='stars'> {k.map(i=><FontAwesomeIcon className='stars'      icon={faStar}/>)}</div>
                <div className='hotellFeatures row'>
                <div>
                    {hotel.features.hotelFeatures.hasCinema?<Chip
                                                                     size="small"
                                                                     icon={<FontAwesomeIcon icon={faTv} />}
                                                                     label="Cinama"
                                                                     color="secondary" />   :""
                    
                    }
                </div>
                <div>
                    {hotel.features.hotelFeatures.hasRestaurant? <Chip
                                                                     size="small"
                                                                     icon={<FontAwesomeIcon icon={faUtensils} />}
                                                                     label="Restaurant"
                                                                     color="secondary" />   :""
                    }
                </div>
                <div>
                    {hotel.features.hotelFeatures.hasSwimmingPool?<Chip
                                                                      size="small"
                                                                         icon={<FontAwesomeIcon icon={faPoll} />}
                                                                           label="SwimmingPool"
                                                                          color="secondary" />   :""
}
                    
                </div>
               
              
                </div>
            </div>
            <div className='cartBooking col'>
                <div className='minPrice'>{hotel.rooms[0].price}$</div>
                <Link to={`/hotelsPage/hotelPage/${hotel._id}`}>
                <button className='btn '>See details {`>`}</button>
                </Link>

            </div>
        </div>
        </Fade>
    )
}

export default HotelCart
