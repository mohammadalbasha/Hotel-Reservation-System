import { FormLabel, Slider } from '@material-ui/core'
import React, { useState } from 'react'
function PriseFilter({state,price ,setState}) {
    const changeHandler=(price)=>{
        setState({...state ,price :price});

    }
    return (
        <div className='priceFilter filter'>
            <FormLabel>Nightly Price:${price[0]} - ${price[1]}+</FormLabel>

           <Slider
            value={price}
            onChange={(e,price)=>{changeHandler(price)}}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
      />
        </div>
    )
}

export default PriseFilter
