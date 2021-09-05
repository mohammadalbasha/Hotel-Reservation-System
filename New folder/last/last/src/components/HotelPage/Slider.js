import React from 'react'
import  InfiniteCarousel from 'react-leaf-carousel'
import BaseInfo from './BaseInfo'

function Slider({hotel}) {
   const offer =hotel.features.offers.hotelDiscount+hotel.features.offers.websiteDiscoun;
    
    return (
        <div className='slider col-lg-7 col-md p-0'>
          {hotel.features.offers.hotelDiscount+hotel.features.offers.websiteDiscount !==0?
                               <div class="ribbon  ribbon--orange"> {hotel.features.offers.hotelDiscount+hotel.features.offers.websiteDiscount}%</div>:
                               ""

          }

        <InfiniteCarousel
             
             slidesToShow={1}
            
             dots={true}
            
 
             >
               {hotel.imagesUrl.map(e=> 
     <div >
       <img src={e} className="d-block w-100" alt="slideImg"></img>
     </div>)}
             </InfiniteCarousel>
        </div>
    )
}

export default Slider
