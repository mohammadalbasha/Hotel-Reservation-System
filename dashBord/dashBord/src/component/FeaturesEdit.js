import React,{useState} from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import ChakeBox from './ChakeBox'
import  Fade from 'react-reveal/Fade'
import {Link,useParams ,useLocation } from 'react-router-dom'



import {faUtensils,faSwimmingPool, faGamepad, faParking, faSmoking,faTv, faTree, faCoffee, faWifi, faShower  }from '@fortawesome/free-solid-svg-icons'
function FeaturesEdit({token,match}) {
    const [success,setSuccess]=useState(false);
    const params = useParams();
    const id =params.id;
    let initialValues={
            hotelFeatures:{
               hasRestaurant:false,
               hasCinama:false,
               hasSwimmingPool:false,
               hasGameHall:false,
               hasParking:false,
               hasSmookingRooms:false,
               description:""
            },
            offers : {
                hotelDiscount:'',
                websiteDiscount:'',
                extra:''
            },
            roomFeatures:{
                vip:{
                    hasCoffeeMachine: false,
                    hasFreeWifi:false,
                    hasBalcony: false,
                    hasJacuzzi: false,
                },
                normal:{
                    hasCoffeeMachine: false,
                    hasFreeWifi:false,
                    hasBalcony: false,
                    hasJacuzzi: false,
                },
                sweet:{
                    hasCoffeeMachine: false,
                    hasFreeWifi:false,
                    hasBalcony: false,
                    hasJacuzzi: false,
                }
            }
        
    
}
const onSubmit=values=>{
    
    axios.put(`http://localhost:8080/admin/editFeature/${id}`,values,{
    
    headers :{"authorization" :`Bearer ${token}`

        }
    })
    .then(response=>{ 
       setSuccess(true)
    })
         .catch(error=>{alert (error)})
         
         
}
const formik=useFormik({
    initialValues,
    onSubmit
})

    return (
        <div>
         <Navbar/>
           <Navigation/>
           <div className='featuresEdit'>
           <div className='featuresEditInner'>
           <h2 className='title'>Features Edit</h2>
           {success ? <div className='addAdminForm addHotelForm'><p className='success'>fitures edited successfully </p></div>:
           <div className='features'>
                  <form onSubmit={formik.handleSubmit} >
                  <span className='span  col-12'> Hotal Features</span>

           <div className='hotelFeatures row '>

           <ChakeBox name='hotelFeatures.hasRestaurant' icon={faUtensils} formik={formik}  header='Restaurant'  value={formik.values.hotelFeatures.hasRestaurant} />
           <ChakeBox name='hotelFeatures.hasCinama' icon={faTv} formik={formik}  header='Cinama'  value={formik.values.hotelFeatures.hasCinama}  />
           <ChakeBox name='hotelFeatures.hasGameHall' icon={faGamepad} formik={formik}  header='Game Hall'   value={formik.values.hotelFeatures.hasGameHall} />
           <ChakeBox name='hotelFeatures.hasSmookingRooms' icon={faSmoking}  formik={formik}  header='Smooking Rooms'    value={formik.values.hotelFeatures.hasSmookingRooms}  />
           <ChakeBox name='hotelFeatures.hasParking' icon={faParking}  formik={formik}  header='Parking'    value={formik.values.hotelFeatures.hasParking}  />
           <ChakeBox name='hotelFeatures.hasSwimmingPool' icon={faSwimmingPool}  formik={formik}  header='SwimmingPool'     value={formik.values.hotelFeatures.hasSwimmingPool}  />
          
           <Fade>
             <div className='innerAddHotel'>
                  <div className='headerAddHotel'>offers</div>
             <input required className='col-xl-5 col-4 '  type='number'       name='offers.hotelDiscount'      value={formik.values.offers.hotelDiscount}                onChange={formik.handleChange } placeholder='   hotelDiscount'></input>
             <input required className='col-xl-5 col-4' type='number'       name='offers.websiteDiscount'   value={formik.values.offers.websiteDiscount}             onChange={formik.handleChange} placeholder='   websiteDiscount'></input>
             <input required className='col-xl-5 col-4'  type='text'     name='offers.extra'    value={formik.values.offers.extra}  onChange={formik.handleChange} placeholder='   extra'></input>
             
             </div>
             </Fade>
             
           </div>
           

           <div className='roomFeatures'>
                    <Fade right> 
                    <div>
                    <span className='span normal col-12'> Normal Room Features</span>
                        <div className='normalFeatures'>
                        <ChakeBox name='roomFeatures.normal.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.roomFeatures.normal.hasBalcony}/>
                            <ChakeBox name='roomFeatures.normal.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.roomFeatures.normal.hasCoffeeMachine} />
                            <ChakeBox name='roomFeatures.normal.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.roomFeatures.normal.hasFreeWifi} />
                            <ChakeBox name='roomFeatures.normal.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.roomFeatures.normal.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>
                        <Fade left> 
                         <div>
                        <span className=' span vip col-12'> Vip Room Features</span>
                        <div className='vipFeatures'>
                            <ChakeBox name='roomFeatures.vip.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.roomFeatures.vip.hasBalcony}/>
                            <ChakeBox name='roomFeatures.vip.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.roomFeatures.vip.hasCoffeeMachine} />
                            <ChakeBox name='roomFeatures.vip.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.roomFeatures.vip.hasFreeWifi} />
                            <ChakeBox name='roomFeatures.vip.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.roomFeatures.vip.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>
                        <Fade right> 
                         <div>
                        <span className='span sweet col-12'> Sweet Room Features</span>
                        <div className='sweetFeatures'>
                            <ChakeBox name='roomFeatures.sweet.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.roomFeatures.sweet.hasBalcony}/>
                            <ChakeBox name='roomFeatures.sweet.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.roomFeatures.sweet.hasCoffeeMachine} />
                            <ChakeBox name='roomFeatures.sweet.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.roomFeatures.sweet.hasFreeWifi} />
                            <ChakeBox name='roomFeatures.sweet.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.roomFeatures.sweet.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>
                        </div>
                        <button  className='btn btn-primary  'type='submit' >edit</button>

           </form>
       

         
           </div>
           }
 </div>
 </div>
        </div>
    )
}

export default FeaturesEdit
