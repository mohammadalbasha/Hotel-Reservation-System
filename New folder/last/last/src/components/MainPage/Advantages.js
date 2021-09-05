import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalculator, faCog, faCalendarAlt ,faCalendarCheck}from '@fortawesome/free-solid-svg-icons'
import { CalendarContainer } from 'react-datepicker'
function Advantages() {
    return (
        <section className='advantagesSection'>
            <div>

                {/* <h5 className='tittel'>Why book with FlyNow.com? </h5> */}
                <div className='advantages row'>
                <section className='col-lg-4'>
                <i><FontAwesomeIcon icon={faCalculator}/></i>
                <div className='info'>
                    <h5>Cancel free reservation</h5>
                    <span>in all hotels</span>
                </div>
                
                </section>
                <section className='col-lg-4'>
                <i><FontAwesomeIcon icon={faCog}/></i> 
                <div className='info'>
                    <h5>Competitive prices</h5>
                    <span>With quality guarantee</span>
                </div>
                
                </section>
                <section className='col-lg-4'>
                <i><FontAwesomeIcon icon={faCalendarCheck}/></i>
                <div className='info'>
                <h5>Cancel free reservation</h5>
                    <span>in all hotels</span>
                </div>
                
                </section>
                </div>
               
            </div>
        </section>
    )
}

export default Advantages
