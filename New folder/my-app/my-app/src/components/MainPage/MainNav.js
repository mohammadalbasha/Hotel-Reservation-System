import React from 'react'
import {Link} from 'react-router-dom'
function MainNav() {
    const token=localStorage.getItem("token")

    return (
        <div className='navbar  navbar-expand-lg '>
        <Link to="/"><a class="navbar-brand" href="#">Fly<span>Now</span></a></Link>
    
                <div >
        <ul class="navbar-nav mr-auto">
        
      
        <li class="nav-item singIn">
        <Link to={token?'/yourBoocking':'/singIn'}>Your bookings</Link>
        </li>
       <li class="nav-item">
        <Link to='/singIn'>Log In</Link>
        </li>
        </ul>
    
        </div>

  </div>
    )
}

export default MainNav
