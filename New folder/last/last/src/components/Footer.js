import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer'>
        
            <footer>
                <section>
                    
                    <ul>
                       {/* soshial media */}

                    </ul>
                    <span></span>
                </section>
                <section>
            <h4>Fly<span>Now</span></h4> 
          <Link to="/OwenerLongIn"> <h5>Hotel Owener</h5></Link> 
                          <p>CB :Mouaz ALbari</p>
                    <p>TryNow T.N., Medan Damascus Syria</p>
                    <p>Copyright 2021 FlyNow | All rights reserved.</p>
                </section>
            </footer>
        </div>
    )
}

export default Footer
