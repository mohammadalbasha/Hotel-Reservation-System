import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import {  InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux"
import {sortHotelsByPrice ,sortHotelsByFeatures,sortHotelsByStars} from '../../redux'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height:56,
   
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
 
  
}));
function Filter() {
    const [stars,setStars]=useState()
    const [price,setPrice]=useState()
    const classes = useStyles();
     const dispatch = useDispatch()

    return (
        <div className='filter'>
            <div className='filterType'>
              <span>store by :</span>
            <FormControl variant="outlined" className={classes.formControl}>
             <InputLabel id="price">Price</InputLabel>
              <Select
                labelId="price"
                // id="demo-simple-select-outlined"
                value={price}
                onChange={(e)=>{dispatch(sortHotelsByPrice(e.target.value))}}
                label="Price"
              >
         
              <MenuItem value="H">Hight to low</MenuItem>
              <MenuItem value="L">Low to hight</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="stars">Stars</InputLabel>
              <Select
                labelId="stars"
                // id="demo-simple-select-outlined"
                value={stars}
                onChange={(e)=>{dispatch(sortHotelsByStars(e.target.value))}}
                label="Stars"
              >
            
              <MenuItem value="H">Hight to low</MenuItem>
              <MenuItem value="L">Low to hight</MenuItem>
             </Select>
            </FormControl>
      
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="stars">Features</InputLabel>
              <Select
                labelId="stars"
                // id="demo-simple-select-outlined"
                value={stars}
                onChange={(e)=>{dispatch(sortHotelsByFeatures(e.target.value))}}
                label="Stars"
              >
              
                <MenuItem value="H">Hight to low</MenuItem>
                <MenuItem value="L">Low to hight</MenuItem>
              </Select>
            </FormControl>
    
            </div>
        </div>
    )
}

export default Filter
