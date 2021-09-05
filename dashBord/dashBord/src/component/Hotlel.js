import React ,{useState}from 'react'
import {faUtensils,faGamepad,faSwimmingPool,faTv, faMapMarkerAlt,faStar ,faSmoking,faParking,faCheck, faCheckCircle, faCoffee, faShower, faBarcode, faTree }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link  } from 'react-router-dom'

import Slide  from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'

function Hotlel({hotel}) {

    const [romSow,togleRoomSoe]=useState(false)
  let k=[];
    for(let i=0;i<hotel.stars;i++){
        k.push("")
    }
    return (
      <Fade top>
        <div className='hotel'>
          <div className=' iner-Hotel row'>
          <div className='slider col-lg-3 col-md-5 col-sm-5'>
            <div id={hotel._id} className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
      {hotel.imagesUrl.map(e=> <li data-target={`#${hotel._id}`} data-slide-to={hotel.imagesUrl.indexOf(e)} className="active"></li>)}
   
   
  </ol>
  <div className="carousel-inner">
  
    {hotel.imagesUrl.map(e=> 
    <div className={`carousel-item ${hotel.imagesUrl.indexOf(e)==1 && `active` }` } >
      <img src={'http://localhost:8080/'+e} className="d-block w-100" alt="slideImg"></img>
    </div>)}
   
  </div>
  <a className="carousel-control-prev" href={`#${hotel._id}`} role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href={`#${hotel._id}`} role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
    </div>
                </div>
                
            <div className='info    col-lg-5 col-md-7 col-sm-7'>
                <h3 className='hotelName' >{hotel.name} </h3>
                <p className='ccountry'>{hotel.country} <FontAwesomeIcon className='faMap'icon={faMapMarkerAlt}/></p>
              <Link 
              to={`./hotelPage/${hotel._id}`} >
                
                 <p className='show-rooms' > Rooms {`>`}</p>
              
              </Link> 
               {k.map(i=><FontAwesomeIcon className='stars'      icon={faStar}/>)}
                <div className='hotellFeatures'>
                <FontAwesomeIcon className='cinama'      icon={hotel.features.hotelFeatures.hasCinema ? faTv :""}/>
                 <FontAwesomeIcon className='pool'        icon={hotel.features.hotelFeatures.hasSwimmingPool ?faSwimmingPool :""}/>
                 <FontAwesomeIcon className='rest'        icon={hotel.features.hotelFeatures.hasRestaurant ?faUtensils :""}/>
                 <FontAwesomeIcon className='rest'        icon={hotel.features.hotelFeatures.hasGamesHall ?faGamepad :""}/>
                 <FontAwesomeIcon className='rest'        icon={hotel.features.hotelFeatures.hasSmookingRooms ?faSmoking :""}/>
                 <FontAwesomeIcon className='rest'        icon={hotel.features.hotelFeatures.hasParking ?faParking :""}/>

                
                </div>
              
            </div>
          </div>
         
        </div>
        </Fade>
     
    )
}

export default Hotlel
