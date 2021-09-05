import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ChakeBox({name,icon,formik ,header,value}) {
    
    return (
        <label   className={`chakeBox  ${ value&&"chakeClicked" } chakeBox`}>
        <input    type='checkbox'     name={name}  value={value}  onChange={formik.handleChange} />

            <i ><FontAwesomeIcon icon={icon}/></i>
            <div >{header}</div>
            
        </label>
    )
}
