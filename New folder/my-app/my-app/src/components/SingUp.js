import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import axios from 'axios';
import { setRef } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
     
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function SingUp() {
    const[data,setData]=useState({
        email : "",
        password : "",
        confirmedPassword : "",
        fullName : "",
        phoneNumber : "",
    })
    const [error,setError]=useState("")
    const [res,setSer]=useState("")

    const handleChange=(event)=>{

        setData({...data, [event.target.name]: event.target.value});
      }
      const handlerSubmit=(e)=>{
        e.preventDefault();
        const postData = JSON.stringify(data);
       axios.put("http://localhost:8080/auth/signUp",data)
       .then((res)=>{
setSer(res)
       })
       .catch((error)=>{
           setError(error)

       })
      }
    const classes = useStyles();

    return (
        <div className='singUpPage'>
            <NavBar/>
            <div className='singUp'>

                <div className="form">
                <form   onSubmit={handlerSubmit}>
         <TextField required name="email" id="outlined-basic"  label="Email" variant="outlined" type="email"  value={data.email} onChange={handleChange}/>
         <TextField required name="password"   label="Password" variant="outlined" type="password"  value={data.password} onChange={handleChange}/>
         <TextField required name="confirmedPassword"   label="confirmedPassword" variant="outlined" type="confirmedPassword"  value={data.confirmedPassword} onChange={handleChange}/>
         <TextField required name='fullName' label="Full Name" variant="outlined"  value={data.fullName} onChange={handleChange}/>
         <TextField required name='phoneNumber' label="PhoneNumber" variant="outlined"  value={data.phoneNumber} onChange={handleChange}/>

         <Button type="submit" variant="contained" color="secondary"> Submit </Button>

         </form>
         {error&&<Alert severity="error">
  <strong>{error.message}</strong>
</Alert>}
   { res&&<Alert severity="success">
 <strong>  You have successfully logged in!</strong>
</Alert>}
                </div>
     
            </div>
       
        </div>
    )
}

export default SingUp
