import React, { useState } from 'react'
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import axios from 'axios';
import { Alert } from '@material-ui/lab';

  
  const useStyles = makeStyles((theme) => ({
   
    form:{
        width:"100%"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    }
  }));
function EditRoomInfo({room}) {
    const classes = useStyles();
  const [roomInfo,setRoomInfo]=useState({
    number:room.number,
    price:room.price,
    size:room.size,
    type:room.type


  })

  const [error,setError]=useState("")
    const [suc,setSuc]=useState(false)
const editHandler=(e)=>{
  e.preventDefault();
        axios.post("url",JSON.stringify(roomInfo) )
        .then((res)=>{setSuc(true)})
        .catch((error)=>{setError(error)})

}
    return (
      
                <div>
                   <h5>Edit room :</h5>
                     <form onSubmit={editHandler} className={classes.form}>
                     <TextField
                     className={classes.formControl}
                  label="Room Number"
                  value={roomInfo.number}
                  onChange={(e)=>{setRoomInfo({...roomInfo,number:e.target.value})}}
                  type="number"
                  InputLabelProps={{
                   shrink: true,
                  }}
                  variant="outlined"
                 />
                     <TextField
                   className={classes.formControl}
                   value={roomInfo.price}
                   onChange={(e)=>{setRoomInfo({...roomInfo,price:e.target.value})}}

                  label="Price"
                  type="number"
                  InputLabelProps={{
                   shrink: true,
                  }}
                  variant="outlined"
                 />
                     <TextField
                  className={classes.formControl}
                  value={roomInfo.size}
                  onChange={(e)=>{setRoomInfo({...roomInfo,size:e.target.value})}}

                  label="Size"
                  type="number"
                  InputLabelProps={{
                   shrink: true,
                  }}
                  variant="outlined"
                 />
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                  value={roomInfo.type}
                  onChange={(e)=>{setRoomInfo({...roomInfo,type:e.target.value})}}

                    label="Room type"
                  >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value='vip'>Vip</MenuItem>
                    <MenuItem value='sweet'>Sweet</MenuItem>
                  </Select>
              </FormControl>
             <Button type="submit" variant="contained" color="secondary"                      className={classes.formControl} >Edit</Button>
                       </form>
                       {error&&<Alert severity="error"className={classes.formControl}
>
                                    <strong>{error.message}</strong>
                                    </Alert>}
                                    { suc&&<Alert severity="success" className={classes.formControl}
>
                                    <strong>  You have successfully Edit !</strong>
                                    </Alert>}
                    
                 </div>

    )
}

export default EditRoomInfo
