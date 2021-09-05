import React,{useEffect, useState } from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {faUtensils,faSwimmingPool,faTv, faMapMarkerAlt,faStar ,faCheck, faCheckCircle, faCoffee, faShower, faBarcode, faTree, faPoll, faParking, faSmoking, faGamepad, faWifi, faEdit }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import hotels from '../hotels.json'
import {Link,useParams ,useLocation } from 'react-router-dom'
import axios from 'axios'

function HotelPage({token}) {

    const params = useParams();
    const [id,setId]=useState(params.id)
    const [hotel,setHotel] = useState();

    const [loading,setLoading] = useState(true);
    
   useEffect (()=>{   axios.get(`http://localhost:8080/admin/getHotel/${id}`,{
        
        headers :{"authorization" :`Bearer ${token}`

            }
        }
      )
      .then(res => {
        setHotel(res.data);
        setLoading(false);
      })
      .catch(err => {
      })
    },[hotel]);
   



  let k=[];
  
   return (

      !loading ? <div className='HotelPage'>
       <Navbar/>

       <Navigation/>

               
            <div className='HotelPageContaner'>
                <div className='info'>
                    <div className='info-contaner'>
                        <div className='right'>
                <h3 className='hotelName' >{hotel.name} </h3>
                <p className='ccountry'>{hotel.country} <FontAwesomeIcon className='faMap'icon={faMapMarkerAlt}/></p>
                <div className='stars'>
                {k.map(i=><FontAwesomeIcon className='stars'      icon={faStar}/>)}
                </div>
             
               <Link to= {`./hotelEdit/${id}`} ><span  className='edit' type="button" >edit <FontAwesomeIcon icon={faEdit}/></span></Link> 
                </div>
                <div className='slider  col-md-5 col-sm-5'>
            <div id='jj' className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
      {hotel.imagesUrl.map(e=> <li data-target='#jj' data-slide-to={hotel.imagesUrl.indexOf(e)} className={`active`}></li>)}
   
   
  </ol>
  <div className="carousel-inner">
  
    {hotel.imagesUrl.map(e=> 

    <div className={`carousel-item ${hotel.imagesUrl.indexOf(e)==0 && `active` }` } >
      <img src={'http://localhost:8080/'+e} className="d-block w-100" alt="slideImg"></img>
    </div>)}
   
  </div>
  <a className="carousel-control-prev" href='#jj' role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href='#jj' role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
    </div>
                </div>
                </div>
               <div>
                   
               </div>
                </div>
                <div className='features'>
                <h2 className='header'>Features  <Link to={`./featuresEdit/${hotel.features._id}`}>  <span type='button'className='edit'>edit <FontAwesomeIcon icon={faEdit}/></span></Link></h2>
              <div>
            
              <div className='hotelFeatures'>
              <span className=' col-12'> Hotel Features</span>
               {hotel.features.hotelFeatures.hasCinema ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faTv }/></i>
                   
                    <p>cinama</p>
                </li>:"" }       
               {hotel.features.hotelFeatures.hasRestaurant ?<li className='feature'>
                    <i><FontAwesomeIcon   icon={ faUtensils}/></i>
                   
                    <p>Restaurant</p>
                </li>:""}        
             {hotel.features.hotelFeatures.hasSwimmingPool ?   <li className='feature'>
                    <i><FontAwesomeIcon    icon={ faSwimmingPool }/></i>
                   
                    <p>Swimming Pool</p>
                </li> :""  }     
              {hotel.features.hotelFeatures.hasParking ?   <li className='feature'>
                    <i><FontAwesomeIcon     icon={faParking}/></i>
                   
                    <p>Parking</p>
                </li>  :""  }    
               {hotel.features.hotelFeatures.hasSmookingRooms ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faSmoking}/></i>
                   
                    <p>Smooking Rooms</p>
                </li>   :"" }    
               { hotel.features.hotelFeatures.hasGamesHall?<li className='feature'>
                    <i><FontAwesomeIcon    icon={faGamepad}/></i>
                   
                    <p>Games Hall</p>
                </li> :""    } 

                <span className=' col-12'> offers</span>
                <p className='features'>hotel Discount : {hotel.features.offers.hotelDiscount}</p>
                <p className='features'>websiteDiscount : {hotel.features.offers.websiteDiscount}</p>
                <p className='features'>extra : {hotel.features.offers.extra}</p>

             


                  
              
              </div>


              </div>

             <div>
              <div className='normalFeatures'>
              <span className='normal col-12'> Normal Features</span>

               {hotel.features.roomFeatures.normal.hasBalcony ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faTree }/></i>
                   
                    <p>Balcony</p>
                </li>:"" }       
               {hotel.features.roomFeatures.normal.hasCoffeeMachine ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faCoffee }/></i>
                   
                    <p>Coffee Machine</p>
                </li>:"" }       
               {hotel.features.roomFeatures.normal.hasJacuzzi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faShower }/></i>
                   
                    <p>Jacuzzi</p>
                </li>:"" }       
               {hotel.features.roomFeatures.normal.hasFreeWifi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faWifi }/></i>
                   
                    <p>Free Wifi</p>
                </li>:"" }       
               
              
              </div>
             </div>
             <div>
              <div className='vipFeatures'>
              <span className='vip col-12'> Vip Features</span>

               {hotel.features.roomFeatures.vip.hasBalcony ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faTree }/></i>
                   
                    <p>Balcony</p>
                </li>:"" }       
               {hotel.features.roomFeatures.vip.hasCoffeeMachine ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faCoffee }/></i>
                   
                    <p>Coffee Machine</p>
                </li>:"" }       
               {hotel.features.roomFeatures.vip.hasJacuzzi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faShower }/></i>
                   
                    <p>Jacuzzi</p>
                </li>:"" }       
               {hotel.features.roomFeatures.vip.hasFreeWifi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faWifi }/></i>
                   
                    <p>FreeWifi</p>
                </li>:"" }       
               
              
              </div>
             </div>
             <div>
              <div className='sweetFeatures'>
              <span className='sweet col-12'> Sweet Features</span>

               {hotel.features.roomFeatures.sweet.hasBalcony ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faTree }/></i>
                   
                    <p>Balcony</p>
                </li>:"" }       
               {hotel.features.roomFeatures.sweet.hasCoffeeMachine ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faCoffee }/></i>
                   
                    <p>Coffee Machine</p>
                </li>:"" }       
               {hotel.features.roomFeatures.sweet.hasJacuzzi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faShower }/></i>
                   
                    <p>Jacuzzi</p>
                </li>:"" }       
               {hotel.features.roomFeatures.sweet.hasFreeWifi ? <li className='feature'>
                    <i><FontAwesomeIcon   icon={ faWifi }/></i>
                   
                    <p>FreeWifi</p>
                </li>:"" }       
               
              
              </div>
             </div>

              </div>
                
                <div className={`rooms row}`} >
                    <h2 className='roomsHeader'>Rooms</h2>
              <table className='iner-rooms  col '>
               <tr> <th> number</th>
                  <th>size</th>
                  <th>price</th>
                  <th>state</th>
                  <th>type</th>
                  <th>edit</th>
                
                </tr>
                {hotel.rooms.map(room=>
                   <tr>
                     <td>{room.number}</td>
                   <td>{room.size}</td>
                   <td>{room.price}$</td>
                   <td className='true'>{room.available&&<FontAwesomeIcon icon={faCheckCircle}/>}</td>
                   <td>{room.type}</td>
                  <Link to={`./roomEdit/${room._id}`}><td type='button' className='edit'>edit <FontAwesomeIcon icon={faEdit}/></td></Link> 
                 
                   
                 </tr>
                )}
               
         
                
              </table>
            </div>
            <div className='hotelFeatures'>
            <span className=' col-12'> owner</span>
                <p className='features'>Name : {hotel.owner.fullName}</p>
                <p className='features'>Email : {hotel.owner.email}</p>
                <p className='features'>PhoneNumber : {hotel.owner.phoneNumber}</p>
            </div>
            </div>    
       
        </div>:""
     
    )
}

export default HotelPage
