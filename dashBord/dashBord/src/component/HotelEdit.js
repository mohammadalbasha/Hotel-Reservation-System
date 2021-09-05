import React,{useState} from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {Link,useParams ,useLocation } from 'react-router-dom'
function HotelEdit({token}) {
    const[imgs,setImg]=useState([])
    const [success,setSuccess]=useState(false);
    const params = useParams();
    const id =params.id;

    let initialValues={
        imges:[],
        name:'',
        country:'',
        location:{
            longitude:"",
            latitude:""
        },
        stars:''}
    
        const changeHandler=(e)=>{
    
            setImg([...imgs,e.target.files[0]])
            
        }
        
        const onSubmit=values=>{
            const formData = new FormData();
            var postData = JSON.stringify(values);
           
            for(let i=0;i<imgs.length;i++)
                 formData.append('imgs',imgs[i]);
    
            formData.append("postData",postData );
            
            axios.put(`http://localhost:8080/admin/editHotel/${id}`,formData,{
            
            headers :{"authorization" :`Bearer ${token}`
    
                }
            })
            .then(response=>{ 
                alert('edited');
               setSuccess(true)
            })
                 .catch(error=>{console.log(values)})
                 
                 
        }
        
        const formik=useFormik({
            initialValues,
            onSubmit
        })
    return (
        
        <div className='hotalEdit'>
                    <Navbar/>
<Navigation/>
              <div className='hotelEditForm'>
                  <div className='headerEditHotel'>Basic Information Hotel Edit</div>
                  <form onSubmit={formik.handleSubmit}>
             <input required className='col-xl-5 col-4 '  type='text'       name='name'                 value={formik.values.name}                onChange={formik.handleChange } placeholder='   Name'></input>
             <input required className='col-xl-5 col-4'   type='text'       name='country'                value={formik.values.country}               onChange={formik.handleChange} placeholder='   country'></input>
             <input required className='col-xl-5 col-4'   type='number'     name='location.longitude'    value={formik.values.location.longitude}   onChange={formik.handleChange} placeholder='   location longitude'></input>
             <input required className='col-xl-5 col-4'   type='number'     name='location.latitude'     value={formik.values.location.latitude}    onChange={formik.handleChange} placeholder='   location latitude'></input>
             <input required className='col-xl-5 col-4'   type='number'     name='stars'                 value={formik.values.stars}                onChange={formik.handleChange} placeholder='  Stars'></input>
             
       
             <div className='addImg'>
                     <input  type='file' name="imegs" multiple style={{display:""}}   onChange={changeHandler} />
                     <p>your Hotels img :</p>
                      {imgs.map(i=>
                        <div className='imgsName'>
                            <div>{i.name}</div>
                        </div>
                      )}
                    </div>
                    <button  className='btn btn-primary  'type='submit'  >Hotal Edit</button>
                    </form>

                    </div>
        </div>
    )
}

export default HotelEdit
