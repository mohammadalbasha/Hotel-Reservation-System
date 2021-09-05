import { Button } from '@material-ui/core'
import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

function Map({hotel}) {
    return (
        <div className='location '>
             <div className='map filter'>
                <i> <FontAwesomeIcon icon={faMapMarker}/></i>
               
        </div>

        </div>
       
    )
}

export default Map
