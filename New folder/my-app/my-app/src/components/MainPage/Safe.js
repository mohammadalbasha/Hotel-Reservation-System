import { faHeartbeat ,faMale ,faSmileBeam ,faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendar }from '@fortawesome/free-solid-svg-icons'
function Safe() {
    return (
        <div className='safeSection'>
            <div className='safe'>
            <h5 className='tittel'>  Travel with confidence</h5>
            <p className='tittelInfo'>Many facilities have sent us updates on additional health and safety standards in place. So, you may find details as follows during your search. </p>
            <div className='row'>
                <section className='col-md-6'>
                <i><FontAwesomeIcon icon={faHeartbeat}/></i> 
                  <div className='info'>
                      <h5>  Official health standards</h5>
                      <span>The establishments’ commitment to the sterilization guidelines imposed on companies and institutions..</span>                  </div>
                </section>
                <section className='col-md-6'>
                <i><FontAwesomeIcon icon={faCheckCircle}/></i> 
                  <div className='info'>
                      <h5>Hygiene and sterilization</h5>
                      <span>  Free hand sanitizer for guests, and options of individually packed food. .</span>
                  </div>
                </section>
                <section className='col-md-6'>
                <i><FontAwesomeIcon icon={faMale}/></i> 
                  <div className='info'>
                      <h5>Spacing between people</h5>
                      <span>Remote check-in and check-out, as well as adherence to social distancing standards..</span>
                  </div>
                </section>
                <section className='col-md-6'>
                <i><FontAwesomeIcon icon={faSmileBeam}/></i> 
                  <div className='info'>
                      <h5> Basic matters in the facility</h5>
                      <span>  Free hand sanitizer for guests, and options of individually packed food. .</span>
                  </div>
                </section>
            </div>
            </div>
        </div>
    )
}

export default Safe
