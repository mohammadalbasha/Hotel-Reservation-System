import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { Checkbox, FormControlLabel,Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const useStyles = makeStyles((theme) => ({
    form:{
    display:'flex',
    
    flexDirection:'column',
    

    },
    paper: {
        marginTop:'20px',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxHeight:"80vh",
        overflowY:"scroll",
    
    },
  }));
  
function EditFeatures({open,setOpen}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [Success,setSuccess]=useState(false)
    const [error,setError]=useState("")
    const handleClose = () => {
        setOpen(false);
      };
      let [initialValues,setValues]=useState({
        hotelFeatures:{
           hasRestaurant:false,
           hasCinama:false,
           hasSwimmingPool:false,
           hasGameHall:false,
           hasParking:false,
           hasSmookingRooms:false,
        },
        roomFeatures:{
            vip:{
                hasCoffeeMachine: false,
                hasFreeWifi:false,
                hasBalcony: false,
                hasJacuzzi: false,
            },
            normal:{
                hasCoffeeMachine: false,
                hasFreeWifi:false,
                hasBalcony: false,
                hasJacuzzi: false,
            },
            sweet:{
                hasCoffeeMachine: false,
                hasFreeWifi:false,
                hasBalcony: false,
                hasJacuzzi: false,
            }
        }
      

})


const SubmitHandler=(e)=>{
    e.preventDefault();
    console.log(initialValues);
    axios.put("url",initialValues)
    .then(response=>{ 
       setSuccess(true)
    })
         .catch(error=>{setError(error)})
         
         
}
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div style={modalStyle} className={classes.paper}>
         <form onSubmit={SubmitHandler} className={classes.form}>
             <h5> your hotel features :</h5>
         {
            
              Object.keys(initialValues.hotelFeatures).map((kye,value)=>
              <FormControlLabel
              control={<Checkbox checked={initialValues.hotelFeatures.kye} 
              onChange={(e)=>{setValues({...initialValues,hotelFeatures:{...initialValues.hotelFeatures,[kye]:!initialValues.hotelFeatures[kye]}}) }} 
              name={kye} />}
              label={kye}
             />
              )
            }
             <h5> normal room features:</h5>
         
            
            {  Object.keys(initialValues.roomFeatures.normal).map((kye,value)=>
              <FormControlLabel
              control={<Checkbox checked={initialValues.roomFeatures.normal.kye} 
              onChange={(e)=>{setValues({...initialValues,roomFeatures:{...initialValues.roomFeatures, normal:{...initialValues.roomFeatures.normal,[kye]:!initialValues.roomFeatures.normal[kye]}}}) }} 

              name={kye} />}
              label={kye}
             />
)}
         
             <h5> sweet room features:</h5>
         
            
            {  Object.keys(initialValues.roomFeatures.sweet).map((kye,value)=>
              <FormControlLabel
              control={<Checkbox checked={initialValues.roomFeatures.sweet.kye} 
              onChange={(e)=>{setValues({...initialValues,roomFeatures:{...initialValues.roomFeatures, sweet:{...initialValues.roomFeatures.sweet,[kye]:!initialValues.roomFeatures.sweet[kye]}}}) }} 

              name={kye} />}
              label={kye}
             />
)}
         
             <h5> Vip room features:</h5>
         
            
            {  Object.keys(initialValues.roomFeatures.vip).map((kye,value)=>
              <FormControlLabel
              control={<Checkbox checked={initialValues.roomFeatures.vip.kye} 
              onChange={(e)=>{setValues({...initialValues,roomFeatures:{...initialValues.roomFeatures, vip:{...initialValues.roomFeatures.vip,[kye]:!initialValues.roomFeatures.vip[kye]}}}) }} 
              name={kye} />}
              label={kye}
             />
)}
         

         <Button type="submit" variant="contained" color="secondary">
                        Submit
                        </Button>
                         {error&&<Alert severity="error">
                                    There is something wrong <strong>{error.message}</strong>
                                    </Alert>}
                                    { Success&&<Alert severity="success">
                                    <strong>  You have successfully Edit !</strong>
                                    </Alert>}
         </form>
        </div>
      </Modal>
        
    )
}

export default EditFeatures
