import React, { useState ,useEffect } from 'react'
import {  Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';

function HotelFeature({state,setState,features}) {
  
     

    const changeHandler=(e,kye)=>{
        setState({...state,features:{...state.features,[kye]:!features[kye]}})
                // dispatch(filterHotelsByFeatures(e,kye))

    }
    
    return (
        <div className='hotelFeatures filter'>
            <FormLabel>Hotel features :</FormLabel>

            <div>
            {
              Object.keys(features).map((kye,value)=>
              <FormControlLabel
              control={<Checkbox checked={features.kye} 
              onChange={(e)=>{changeHandler(features[kye],kye) }} 
              name={kye} />}
              label={kye}
             />
              )
            }
            
            
            </div>
            

        </div>
    )
}

export default HotelFeature
