import { faLocationArrow, faMapMarker, faStar, faSwimmingPool, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import InfiniteCarousel  from 'react-leaf-carousel';
import { Link } from 'react-router-dom';

function HotelCard({hotel}) {
    let k=[];
    for(let i=0;i<hotel.stars;i++){
        k.push("")
    }
    return (
        <div className='cart'>

            <span></span>
            <div className='img'>

            <InfiniteCarousel
             
             slidesToShow={1}
            
             arrows={false}

            
 
             >
               {hotel.imagesUrl.map(e=> 
     <div >
                     <div class="ribbon  ribbon--orange"> {hotel.features.offers.hotelDiscount+hotel.features.offers.websiteDiscount}%</div>

       <img src={e} className="d-block w-100" alt="slideImg"></img>
     </div>)}
             </InfiniteCarousel>
            </div>
            <div className='info'>
             
                <h6 className='name'>{hotel.name}</h6>
              
           
            <div className='stars'> {k.map(i=><FontAwesomeIcon className='stars'      icon={faStar}/>)}</div>

             <p className='country'>{hotel.country}</p>
             <div className='go'>
             <Link to={`/hotelsPage/hotelPage/${hotel._id}`}>
                <button className='btn '>See details {`>`}</button>
                </Link>

                {/* <p className='price'>{hotel.rooms[0].price}$</p> */}
               
                </div>
           
           
            </div>
        </div>
    )
}

export default HotelCard
 