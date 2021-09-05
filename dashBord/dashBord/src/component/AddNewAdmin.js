import React,{useState} from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import {useFormik} from 'formik'
import  Fade from 'react-reveal/Fade'

import axios from 'axios'
function AddNewAdmin({token}) {
    const [success,setSuccess]=useState(false);

    const onSubmit=values=>{
        axios.put("http://localhost:8080/auth/admin/signUp",values,{
            headers :{"authorization" :`Bearer ${token}`

            }
        })
        .then(response=>{ 
            alert(response.data)        })
        .catch(error=>{alert(error)})
             
             
    }
    const initialValues={
        email:'',
        password:'',
        fullName:'',
        phoneNumber:'',
        confirmedPassword:''
    
}
        const formik=useFormik({
            initialValues,
            onSubmit
        })
    return (
       
        <div className='addAdminPage'>
            <Navbar/>
           <Navigation/>
           <Fade top>
               <div style={{width:'100%',height:"100%"}} >
           {success? <div className='addAdminForm'><p>A new admin has been added  * * </p></div>:
          
            <div className='addAdminForm'>
             <div className='addAdmin'>
           
                  
            <div className='admin-inner'>
            <h2 className='admin-header'>Add a New Admin</h2>
            <form onSubmit={formik.handleSubmit}  className='row'>
             <input required className='col-xl-5 col-md-4'  type='text'     name='fullName'   value={formik.values.fullName}    onChange={formik.handleChange} placeholder='  Full Name'></input>
             <input required className='col-xl-5 col-md-4' type='email'    name='email'      value={formik.values.email}       onChange={formik.handleChange} placeholder='  Email address'></input>
             <input required className='col-xl-5 col-md-4'  type='password' name='password'   value={formik.values.password}    onChange={formik.handleChange} placeholder='  Password'></input>
             <input required className='col-xl-5 col-md-4'  type='password' name='confirmedPassword'   value={formik.values.confirmedPassword}    onChange={formik.handleChange} placeholder='  confirmed Passsword'></input>
             <input required className='col-xl-10 col-md-8'  type='text'     name='phoneNumber'   value={formik.values.phoneNumber}    onChange={formik.handleChange} placeholder='  Phone Number'></input>
             <button  className='btn btn-primary  'type='submit'>submit</button>
             
            
         </form>
         </div>
             </div>
       
         </div>
       
        } 
        </div>
           </Fade>
           
        </div>
      
    )
}

export default AddNewAdmin
