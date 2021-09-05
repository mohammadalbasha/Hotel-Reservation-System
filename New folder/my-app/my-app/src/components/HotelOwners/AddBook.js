import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));
function AddBook({room}) {
    const classes = useStyles();
    const token=localStorage.getItem('tokenOwener');
    const hotel=useSelector(state=>state.OwenerLogIn.hotel)
    const [error,setError]=useState("")
    const [suc,setSuc]=useState(false)
    const changHandler=(e,type)=>{
        setData({...data,[type]:e.target.value})
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/owner/addBook",data ,{
          headers : {
            'Authorization' : `bearer ${token}`
          }
        })
        .then((res)=>{setSuc(true)})
        .catch((error)=>{setError(error)})

        console.log(data);
    }
     const [data,setData]=useState({
        token:token,
        fullName:"",
        roomId : room._id,
        phoneNumber:"",
        securityNumber:"",
        country:hotel.country,
        checkIn:new Date(),
        checkOut:new Date()

      })
    return (
        <div className='addBook'>
            <p>book room number {room.number}</p>
            <form  className={classes.root} onSubmit={submitHandler}  noValidate autoComplete="off" >
            <TextField value={data.fullName}   onChange={(e)=>{changHandler(e,"fullName")}} label="Full Name" variant="outlined" />
            <TextField value={data.phoneNumber}  onChange={(e)=>{changHandler(e,"phoneNumber")}} label="Phone Number" variant="outlined" />
            <TextField value={data.securityNumber}   onChange={(e)=>{changHandler(e,"securityNumber")}} label="Security Number" variant="outlined" />
            <div className='check'>
            <p> Check In  </p>
            <DatePicker  
                        selected={data.checkIn}
                        onChange={(value)=>{setData({...data,checkIn:value})}}
                        minDate={new Date()}
                        name="checkOut"
                    />
                    </div>
                      <div className='check'>
            <p> Check Out  </p>
                      <DatePicker 
                            selected={data.checkOut}
                            onChange={(value)=>{setData({...data,checkOut:value})}}
                            minDate={data.checkIn}
                            name="checkOut"

                        />
                        </div>
                        <Button type="submit" variant="contained" color="secondary">
                        Book
                        </Button>
                                    {error&&<Alert severity="error">
                                    There is something wrong <strong>{error.message}</strong>
                                    </Alert>}
                                    { suc&&<Alert severity="success">
                                    <strong>  You have successfully Booking !</strong>
                                    </Alert>}
                    

            </form>
            
        </div>
    )
}

export default AddBook
