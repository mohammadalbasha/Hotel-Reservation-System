import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarAlt }from '@fortawesome/free-solid-svg-icons'
import { useFormik, Field, Form } from "formik";
import {fachHotels} from '../../redux'

import {useDispatch,useSelector} from "react-redux"
import { Link, Redirect } from 'react-router-dom'
function Chake(props) {
    
    const initialValues ={
        checkIn:new Date(),
        checkOut:new Date(),
        country:"spain"
    }
    const [check,setChck]=useState(initialValues)
    const [i,seti]=useState(false)
    const dispatch=useDispatch()
    
    
    const onSubmit=(e)=>{

        e.preventDefault(); 
        dispatch(fachHotels(check))
        seti(true)
       
    }
    useEffect(() => {
        // console.log(hotels,loading,error);
        localStorage.setItem("check",JSON.stringify(initialValues))

    },[initialValues])
    return (
       
        i==true?<Redirect to="/hotelsPage"/>:

        <div className='chake'>
          
            <div className='overLay'>
                <img src='/imgs/mainPag.jpg'></img>
                <div></div>
            </div>
            <div className='innerChacke'>
            <h4> <p>Looking</p>  <p> for  Hotel ?</p></h4>
        <p className='text'>Hotel finder </p>
        <form onSubmit={onSubmit}>
        <div className='formChake'>
        <div className='formOverllay'></div>
     
            <div className='row'>
            <div className='textAria col-5 '>
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
            <div className='textAria col-5 '>
           <i><FontAwesomeIcon icon={faCalendarAlt}/></i> 
            <div className=''>
            <p>Check Out   </p>
                <DatePicker 
                    selected={check.checkOut}
                    onChange={(value)=>{setChck({...check,checkOut:value})}}
                    minDate={check.checkIn}
                    name="checkOut"

                />
            </div>
               
                </div>
               
            <div className=' country textAria col-5  '>
                <div>
                <p>Country</p>
                  <input value={check.country}
                         name="country"
                         onChange={(e)=>{setChck({...check,country:e.target.value})}}
                  ></input>
                </div>
                
            </div>
         
              
             
            {/* </div> */}

            <div className='textAria sharsh col-5 '>
              {/* <Link type='submit' to="./hotelsPage">go</Link>   */}
                  <button type='submit'  className=''>Search {`>`}</button>
                  
            </div>
            </div>

    </div>
    </form>
            </div>
          
</div>

    )
}

export default Chake
