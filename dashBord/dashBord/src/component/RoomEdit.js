
import React ,{useState} from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import {Link,useParams ,useLocation } from 'react-router-dom'

function RoomEdit(token) {
    const [success,setSuccess]=useState(false);
    const params = useParams();
    const id =params.id;


    let initialValues={
        number:"",
        price:'',
        size:'',
        type:''
    }
    const onSubmit=values=>{
        
        
        axios.put(`http://localhost:8080/admin/editRoom/${id}`,values,{
            
            headers :{"authorization" :`Bearer ${token}`
    
                }
            })
        .then(response=>{ 
           setSuccess(true);
        })
             .catch(error=>{alert(error)})
             
             
    }
    const formik=useFormik({
        initialValues,
        onSubmit
    })
    return (
        <div>
      {success ? <div className='addAdminForm addHotelForm'><p className='success'>room edited successfully </p></div>:

             <div className='roomEdit'>
                 
                  <div className='innerRoomEdit'>
                  <form onSubmit={formik.handleSubmit}  >
                              
                   <input required   type='number'     name='number'         value={formik.values.number}      onChange={formik.handleChange}  placeholder='  Number '></input>
                   <input required   type='number'     name='price'          value={formik.values.price}       onChange={formik.handleChange}  placeholder=' price '></input>
                   <input required   type='number'     name='size'           value={formik.values.size}        onChange={formik.handleChange}  placeholder=' size '></input>
                    <div className='type'>
                    <select className="custom-select mr-sm-2" name='type'   onChange={formik.handleChange}>
                        <option selected> room type </option>
                        <option key="normal" value='normal'>normal</option>
                        <option key="vip" value='vip'>vip</option>
                        <option key="sweet" value='sweet'>sweet</option>
                    </select>
                    </div>
                    <button  className='btn btn-primary'type='submit'>edit</button>
                    </form>
                   </div>
                   </div>
}
        </div>
    )
}

export default RoomEdit
