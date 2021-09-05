import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
stars:{
    color:'gold'
}
}))

function StarRate({state,setState,stars}) {
    const classes=useStyles()

  
    const handleChange = (event) => {
      setState({...state ,stars:event.target.value});
      };
    
    return (
        <div className='filter'>
               <FormControl >
      <FormLabel >Stars</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={stars} onChange={handleChange} className={classes.stars}>
        <FormControlLabel value="1" control={<Radio />} label={[1].map(i=> <FontAwesomeIcon icon={faStar}/>)} />
        <FormControlLabel value="2" control={<Radio />}  label={[1,2].map(i=> <FontAwesomeIcon icon={faStar}/>)} />
        <FormControlLabel value="3" control={<Radio />}  label={[1,2,3].map(i=> <FontAwesomeIcon icon={faStar}/>)} />
        <FormControlLabel value="4" control={<Radio />}  label={[1,2,3,4].map(i=> <FontAwesomeIcon icon={faStar}/>)} />
        <FormControlLabel value="5" control={<Radio />}  label={[1,2,3,4,5].map(i=> <FontAwesomeIcon icon={faStar}/>)} />
      </RadioGroup>
    </FormControl>
    
          </div>
    )
}

export default StarRate

