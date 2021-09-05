import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, SwipeableDrawer } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {logIN} from '../redux'
import { Alert, AlertTitle } from '@material-ui/lab';

import { fab } from '@fortawesome/free-brands-svg-icons'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
function SingIn() {
  library.add(fab)

    const dispatch =useDispatch()
    const token = useSelector(state => state.logIn.token)
    const error = useSelector(state => state.logIn.error)
    const classes = makeStyles();
   
    const [values, setValues] = React.useState({
      email: '',
      password: '',
      weightRange: '',
      showPassword: false,
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
   
    return (
        <div className='singInPage'>

            <NavBar/>
     

           <div>
      
  
    </div>
            <div class="SingIn p-2 pt-5 pb-5 ">
            <header> <h3>Log in</h3> </header>
            <div className='form'>
            <form onSubmit={(e)=>{   e.preventDefault(); dispatch(logIN(values))}}>
        
        
          <TextField
          required
            id="outlined-helperText"
            label="Email"
            type='email'
            value={values.email}
            onChange={handleChange('email')}
  
          //   defaultValue="Default Value"
          //   helperText="Some important text"
            variant="outlined"
          />
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
            required
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button variant="contained" color="secondary" type='submit'>
          Log in
          </Button>
        
  
              </form>
           
             <div className='google'><a style={{cursor:'pointer'}}> <FontAwesomeIcon icon={["fab", "google"]} /> Log In with Google ?</a></div> 
            <Link to="/singUp"> <button className="btn btn-success mb-2">Sing Up</button></Link>
             {error&&<Alert severity="error">
  There is something wrong <strong>{error.message}</strong>
</Alert>}
   { token&&<Alert severity="success">
 <strong>  You have successfully logged in!</strong>
</Alert>}
            </div>
          

            </div>
            <div>
 
     
    
    </div>
   
   
        </div>
    )
}

export default SingIn
