import React, { useState } from 'react'
import {  Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';

function RoomsFeature({state,setState,roomsFeature}) {
   

    const changeHandler=(e,kye)=>{
        setState({...state,roomsFeature:{...state.roomsFeature,[kye]:!roomsFeature[kye]}})

    }
    return (
        <div className='roomsFeature filter'>

            <FormLabel>Room feature</FormLabel>

            <div>
            {
              Object.keys(roomsFeature).map((kye,value)=>
              <FormControlLabel
                control={<Checkbox 
                checked={roomsFeature.kye} 
                onChange={(e)=>{changeHandler(e.target.value,kye) }} 
                name={kye} />}
                label={kye}
             />
              )
            }
            
         
            </div>
        </div>
    )
}

export default RoomsFeature
