import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft ,faSearch ,faUserShield,faHSquare } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar navbar-expand-lg '>
         <Link to='../mainPageAdmin'> <div className='logo'><FontAwesomeIcon icon={faHSquare}/></div></Link>
          {/* <a className='mnue' ><FontAwesomeIcon icon={faAlignLeft}/></a> */}
         
          <span className='adminIcon'><FontAwesomeIcon icon={faUserShield}/></span>
          <div className='inputGroup'>
          <input placeholder='Search...'></input>
         
          <span><FontAwesomeIcon icon={faSearch}/></span>
        
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon mnue"><FontAwesomeIcon icon={faAlignLeft}/></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav">
      
          <ul className="navbar-nav list">
          <Link to='../hotelPage/Users'><li className="nav-item nav-link active">Users</li></Link>  
         <Link to='../mainPageAdmin/addHotel'><li className="nav-item nav-link">Add hotel</li></Link> 
         <Link to='../mainPageAdmin/addNewAdmin'> <li className="nav-item nav-link ">Add admin</li></Link>
           </ul>
          </div>
        </div>
    )
}

export default Navbar
