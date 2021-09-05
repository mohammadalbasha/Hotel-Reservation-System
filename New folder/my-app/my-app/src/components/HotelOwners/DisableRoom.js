import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios';
import { Alert } from '@material-ui/lab';

function DisableRoom({room}) {
    const [error,setError]=useState("")
    const [suc,setSuc]=useState(false)
const token = localStorage.getItem('tokenOwener');
    const disableHandler=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:8080/owner/disableRoom/${room._id}`,{
            headers : {
                'Authorization' : `bearer ${token}`
            }
        } )
        .then((res)=>{setSuc(true)
            
        })
        .catch((error)=>{setError(error);
            alert('slknd')})
    }
    
    return (
        <>
        <p>Disable room number {room.number}</p>
        <Button onClick={disableHandler} type="submit" variant="contained" color="secondary">   Disable  </Button>
        {error&&<Alert severity="error"
>
                                    <strong>{error.message}</strong>
                                    </Alert>}
                                    { suc&&<Alert severity="success" 
>
                                    <strong>  You have successfully Disable !</strong>
                                    </Alert>}
       </>
    )
}

export default DisableRoom
