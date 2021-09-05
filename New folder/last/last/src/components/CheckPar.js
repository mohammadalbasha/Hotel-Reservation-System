import React,{useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt }from '@fortawesome/free-solid-svg-icons'
import {fachHotels} from '../redux'
import {useDispatch} from "react-redux"
import { Redirect } from 'react-router-dom'
function CheckPar() {
    const initialValues ={
        checkIn:new Date(),
        checkOut:new Date(),
        country:"Damascuse"
    }
    
    const [check,setChck]=useState(initialValues)
    const [i,seti]=useState(false)
    const dispatch=useDispatch()
    
    
    const onSubmit=(e)=>{
        e.preventDefault(); 
        dispatch(fachHotels(check))
        seti(true)
       
    }
    return (
        <>
      <div className='chackPar  nav-dark'>
          <form onSubmit={onSubmit}>
       
           <div className='formChake'>
            <div className='formOverllay'></div>
     
             <div className='row'>
             <div className=' country textAria col-md  col-5 '>
                <div>
                  <p>Country</p>
                  <input value={check.country}
                         name="country"
                         onChange={(e)=>{setChck({...check,country:e.target.value})}}
                  ></input>
                </div>
                
            </div>
         
                
            <div className='textAria col-md col-5 '>
                <i><FontAwesomeIcon icon={faCalendarAlt}/></i> 
                <div>
                <p> Check In  </p>
                    <DatePicker  
                        selected={check.checkIn}
                        onChange={(value)=>{setChck({...check,checkIn:value})}}
                        minDate={new Date()}
                        name="checkOut"
                    />
                </div>
               
            </div>

            <div className='textAria col-md col-5 '>
                <i><FontAwesomeIcon icon={faCalendarAlt}/></i> 
                <div>
                    <p>Check Out   </p>
                        <DatePicker 
                            selected={check.checkOut}
                            onChange={(value)=>{setChck({...check,checkOut:value})}}
                            minDate={check.checkIn}
                            name="checkOut"

                        />
                </div>
               
             </div>
               
     
              
             
       

            <div className='textAria sharsh col-md col-5 '>
              
                  <button type='submit'  className=''>Search {`>`}</button>
                  
            </div>
            </div>

    </div>    </form>  
        </div>
        {i==true?<Redirect to="/hotelsPage"/>:""}
        </>
    )
}

export default CheckPar
