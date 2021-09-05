

import React ,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import  Fade from 'react-reveal/Fade'
import Roll from 'react-reveal/Roll';

import {faUtensils,faSwimmingPool,faTv, faMapMarkerAlt,faStar, faAddressBook, faGamepad, faParking, faSmoking, faBackspace, faPlane, faTree, faCoffee, faWifi, faShower  }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadImg from './UploadImg'
import ChakeBox from './ChakeBox'


function AddHotel({token}) {
     const[imgs,setImg]=useState([])
    const[rooms,setRooms]=useState([])
    const [numOfRoom,setRoomNum]=useState("");
    const [success,setSuccess]=useState(null);
   useEffect(() => {
   // console.log(initialValues.rooms)
   
    setRooms([])
      for(let i=0;i<numOfRoom;i++){
       
        
        setRooms((pre)=>[...pre,{
            number:"",
            price:'',
            size:'',
            type:''
        }])
       
        
           
    
         
         
    }}
      
   , [numOfRoom])

   const changeHandler=(e)=>{

    setImg([...imgs,e.target.files[0]])
    
}


const clickHandler=()=>{
        
//     const fd=new FormData();

//   for(let i=0;i<imgs.length;i++){

//     fd.append(imgs[i].name,imgs[i]);
  
//   }
//     formik.values.imges=[...Array.from(fd) ]
//   //  console.log(...Array.from(fd));

   

 }
    const onSubmit=values=>{
        
        const formData = new FormData();
        var postData = JSON.stringify(values);
       
        for(let i=0;i<imgs.length;i++)
             formData.append('imgs',imgs[i]);

        formData.append("postData",postData );
        
        axios.post("http://localhost:8080/admin/addHotel",formData,{
        
        headers :{"authorization" :`Bearer ${token}`

            }
        })
        .then(response=>{ 
           setSuccess(response.data)
        })
             .catch(error=>{console.log(values)})
             
             
    }
    let initialValues={
        imges:[],
        name:'',
        country:'',
        location:{
            longitude:"",
            latitude:""
        },
        stars:'',
        owner:{
            fullName:"",
            email:"",
            phoneNumber:"",
        },
      
        rooms:[...rooms],
        features:{
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
                hotelDiscount : "",
                websiteDiscount : "",
                extra : ""
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
    
}
        const formik=useFormik({
            initialValues,
            onSubmit
        })
        // formik.values.rooms=rooms 
    return (
        <div className=' addHotelPage'>
            <Navbar/>
           <Navigation/>
           <h2 className='title'>Add a New Hotel</h2>
           {success ? <div className='addAdminForm addHotelForm'><p className='success'>A new Hotel has been added  * *
           <br/>
           <br/>
           <h1>
               Owner Code : {success}

           </h1>
           <p>
               you will use this code for accessing owners section in main app
           </p>
            </p></div>:

           <div className=' addHotelForm'>
              
          <form onSubmit={formik.handleSubmit}  className='row'>
            
          <div className='addHotel'>

              <div className='innerAddHotel'>
                  <div className='headerAddHotel'>Basic Information</div>
             <input required className='col-xl-5 col-4 '  type='text'       name='name'                  value={formik.values.name}                onChange={formik.handleChange } placeholder='   Name'></input>
             <input required className='col-xl-5 col-4' type='text'       name='country'               value={formik.values.country}             onChange={formik.handleChange} placeholder='   country'></input>
             <input required className='col-xl-5 col-4'  type='number'     name='location.longitude'    value={formik.values.location.longitude}  onChange={formik.handleChange} placeholder='   location longitude'></input>
             <input required className='col-xl-5 col-4'  type='number'     name='location.latitude'     value={formik.values.location.latitude}   onChange={formik.handleChange} placeholder='   location latitude'></input>
             <input required className='col-xl-5 col-4'  type='number'     name='stars'                 value={formik.values.stars}               onChange={formik.handleChange} placeholder='  Stars'></input>
             <input required className='col-xl-5 col-4'  type='number'     name='numOfRom'              value={numOfRoom}                         onChange={(e)=>{   setRoomNum(e.target.value)}} placeholder='  number Of Rom'></input>
             
             </div>
             
             <div className='innerAddHotel'>
                  <div className='headerAddHotel'>Owner Information</div>
             <input required className='col-xl-5 col-4 '  type='text'       name='owner.fullName'                  value={formik.values.owner.fullName}                onChange={formik.handleChange } placeholder=' Name'></input>
             <input required className='col-xl-5 col-4' type='text'       name='owner.email'               value={formik.values.owner.email}             onChange={formik.handleChange} placeholder='   email'></input>
             <input required className='col-xl-5 col-4'  type='text'     name='owner.phoneNumber'    value={formik.values.owner.phoneNumber}  onChange={formik.handleChange} placeholder='   phoneNumber'></input>
             
             </div>
             
             
             <Fade >
                 <div>
             <span className='span col-12'> Hotel Features</span>
             
             <div className='hotelFeatures row '>

             <ChakeBox name='features.hotelFeatures.hasRestaurant' icon={faUtensils} formik={formik}  header='Restaurant'  value={formik.values.features.hotelFeatures.hasRestaurant} />
             <ChakeBox name='features.hotelFeatures.hasCinama' icon={faTv} formik={formik}  header='Cinama'  value={formik.values.features.hotelFeatures.hasCinama}  />
             <ChakeBox name='features.hotelFeatures.hasGameHall' icon={faGamepad} formik={formik}  header='Game Hall'   value={formik.values.features.hotelFeatures.hasGameHall} />
             <ChakeBox name='features.hotelFeatures.hasSmookingRooms' icon={faSmoking}  formik={formik}  header='Smooking Rooms'    value={formik.values.features.hotelFeatures.hasSmookingRooms}  />
             <ChakeBox name='features.hotelFeatures.hasParking' icon={faParking}  formik={formik}  header='Parking'    value={formik.values.features.hotelFeatures.hasParking}  />
             <ChakeBox name='features.hotelFeatures.hasSwimmingPool' icon={faSwimmingPool}  formik={formik}  header='SwimmingPool'     value={formik.values.features.hotelFeatures.hasSwimmingPool}  />
            
             </div>
           
             </div>
             
             </Fade>
             <Fade>
             <div className='innerAddHotel'>
                  <div className='headerAddHotel'>offers</div>
             <input required className='col-xl-5 col-4 '  type='number'       name='features.offers.hotelDiscount'      value={formik.values.features.offers.hotelDiscount}                onChange={formik.handleChange } placeholder='   hotelDiscount'></input>
             <input required className='col-xl-5 col-4' type='number'       name='features.offers.websiteDiscount'   value={formik.values.features.offers.websiteDiscount}             onChange={formik.handleChange} placeholder='   websiteDiscount'></input>
             <input required className='col-xl-5 col-4'  type='text'     name='features.offers.extra'    value={formik.values.features.offers.extra}  onChange={formik.handleChange} placeholder='   extra'></input>
             
             </div>
             </Fade>
             
               </div>
                 
                  {initialValues.rooms.map(e=>
                  <Fade >
                       <div className='addRoom'>
                  <div className='room-inner'>
                  <h5 className='room-header'>room number {rooms.indexOf(e)}</h5>
                  
                   <input required className='col'  type='number'     name={`rooms[${rooms.indexOf(e)}].number`}                value={formik.values.rooms.number}              onChange={formik.handleChange} placeholder='   Number '></input>
                   <input required className='col'  type='number'       name={`rooms[${rooms.indexOf(e)}].price`}               value={formik.values.rooms.price}             onChange={formik.handleChange}  placeholder='   price '></input>
                   <input required className='col'  type='number'       name={`rooms[${rooms.indexOf(e)}].size`}                value={formik.values.rooms.size}                 onChange={formik.handleChange}  placeholder='   size '></input>
                    <div className='type'>
                    <select className="custom-select mr-sm-2" name={`rooms[${rooms.indexOf(e)}].type`}   onChange={formik.handleChange}>
                        <option selected> room type </option>
                        <option key="normal" value='normal'>normal</option>
                        <option key="vip" value='vip'>vip</option>
                        <option key="sweet" value='sweet'>sweet</option>
                    </select>
                    </div>
                   </div>
                   </div>
                   </Fade>
                    )}
                    
                   
                    <div className='roomFeatures'>
                    <Fade > 
                    <div>
                    <span className='span normal col-12'> Normal Room Features</span>
                        <div className='normalFeatures'>
                        <ChakeBox name='features.roomFeatures.normal.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.features.roomFeatures.normal.hasBalcony}/>
                            <ChakeBox name='features.roomFeatures.normal.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.features.roomFeatures.normal.hasCoffeeMachine} />
                            <ChakeBox name='features.roomFeatures.normal.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.features.roomFeatures.normal.hasFreeWifi} />
                            <ChakeBox name='features.roomFeatures.normal.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.features.roomFeatures.normal.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>
                        <Fade > 
                         <div>
                        <span className=' span vip col-12'> Vip Room Features</span>
                        <div className='vipFeatures'>
                            <ChakeBox name='features.roomFeatures.vip.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.features.roomFeatures.vip.hasBalcony}/>
                            <ChakeBox name='features.roomFeatures.vip.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.features.roomFeatures.vip.hasCoffeeMachine} />
                            <ChakeBox name='features.roomFeatures.vip.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.features.roomFeatures.vip.hasFreeWifi} />
                            <ChakeBox name='features.roomFeatures.vip.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.features.roomFeatures.vip.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>
                        <Fade > 
                         <div>
                        <span className='span sweet col-12'> Sweet Room Features</span>
                        <div className='sweetFeatures'>
                            <ChakeBox name='features.roomFeatures.sweet.hasBalcony' icon={faTree} formik={formik}  header='Balcony'  value={formik.values.features.roomFeatures.sweet.hasBalcony}/>
                            <ChakeBox name='features.roomFeatures.sweet.hasCoffeeMachine' icon={faCoffee} formik={formik}  header='CoffeeMachine' value={formik.values.features.roomFeatures.sweet.hasCoffeeMachine} />
                            <ChakeBox name='features.roomFeatures.sweet.hasFreeWifi' icon={faWifi} formik={formik}  header='Wifi'  value={formik.values.features.roomFeatures.sweet.hasFreeWifi} />
                            <ChakeBox name='features.roomFeatures.sweet.hasJacuzzi' icon={faShower} formik={formik}  header='Jacuzzi'  value={formik.values.features.roomFeatures.sweet.hasJacuzzi} />
                        </div>
                        </div>
                        </Fade>

                        <div className='addImg'>
                     <input  type='file' name="imegs" multiple style={{display:""}}   onChange={changeHandler} />
                     <p>your Hotels img :
                         1-7 for Hotel
                         8 for vip Rooms
                         9 for normal Rooms 
                         10 for sweet Rooms
                     </p>
                      {imgs.map(i=>
                        <div className='imgsName'>
                            <div>{i.name}</div>
                        </div>
                      )}
                    </div>
    



             <button  className='btn btn-primary  'type='submit' onClick={clickHandler}>submit</button>

</div>
         </form>
         </div>
        }
        </div>
    
    )
}

export default AddHotel

