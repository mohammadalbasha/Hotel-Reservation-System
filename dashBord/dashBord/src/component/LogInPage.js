import React,{useState}  from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import {Link} from 'react-router-dom'
function LogIn({setToken}) {

    const initialValues={
            email:'',
            password:''
            
    }
  
    const onSubmit=values=>{
        
        axios.post("http://localhost:8080/auth/admin/login",values)
        .then(response=>{ 
            localStorage.setItem('token',response.data.token);
            setToken(response.data.token);
        
        })
             .catch(error=>{alert(error)})
             
             
    }
    const formik=useFormik({
        initialValues,
        onSubmit
    })
    return (
        <div className='logIn'>
            <div className='inerLogin'>
               
           <div className='form'>
    
           <form onSubmit={formik.handleSubmit}>
           <h2>SIGIN IN</h2>
                <input required type='email' placeholder='Email address' name='email' value={formik.values.email} onChange={formik.handleChange}></input>
                <input required type='password' placeholder='Password' name='password' value={formik.values.password} onChange={formik.handleChange}></input>
               
                <button type='submit ' className='btn btn-info'> SUBMIT </button> 
              

            </form>
           </div>
           
           
           
            </div>
        </div>
    )
}

export default LogIn
