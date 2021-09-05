import { faStar ,faMapMarker} from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function BaseInfo({hotel}) {
    
    let k=[];
    for(let i=0;i<hotel.stars;i++){
        k.push("")
    }

    return (
        <div className='mainInfo center'>
        <h2 className='name'>{hotel.name}</h2>
        
        <div className='stars'> {k.map(i=><span><FontAwesomeIcon className='stars'      icon={faStar}/></span>)}</div>
        <p className='country'><span><FontAwesomeIcon icon={faMapMarker}/></span>{hotel.country}</p>

        </div>
    )
}

export default BaseInfo
