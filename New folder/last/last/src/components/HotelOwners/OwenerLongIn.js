import { Button, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router'
import {owenerlogIN} from '../../redux'
function OwenerLongIn() {
    const [id ,setId]=useState("")
    const token=useSelector(state=>state.OwenerLogIn.token)
    const error=useSelector(state=>state.OwenerLogIn.error)
    const dispatch =useDispatch()
   
  
    const submitHandler=(e)=>{
        e.preventDefault(); 
        dispatch(owenerlogIN(e.target.value))
    }
    return (
        token?<Redirect to="/MainPageOwener"/>:
        <div className='OwenerLongInPage'>
           <div className='form'>
               <h4 className='mb-4'>Your Hotel Id </h4>
               <form onSubmit={submitHandler}>  
                     <TextField value={id} onChange={(e)=>{setId(e.target.value)}} id="outlined-basic" label="id" variant="outlined" />
                     <div className='m-1'></div>
            <Button  variant="contained" color="primary"  type='submit'>
                Log In
                </Button>
                <div className='mt-2'>
                {error&&<Alert severity="error">
  There is something wrong <strong>Unacceptable</strong>
</Alert>}
                </div>
               
                            </form>
           </div>
        </div>
    )
}

export default OwenerLongIn
