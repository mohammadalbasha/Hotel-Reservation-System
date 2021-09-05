import { Slide, useScrollTrigger } from '@material-ui/core'
import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
function NavBar({window}) {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const token=localStorage.getItem("token")
   useEffect(() => {
    console.log(token);

   }, [token])
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        <div className='navbar  navbar-expand-lg '>
              <Link to="/"><a class="navbar-brand" href="#">Fly<span>Now</span></a></Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i style={{color:"orang"}} class="fa fa-bars" aria-hidden="true"></i></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item singIn">
       <Link to='/singIn'> Sing In</Link>
      </li>
      <li class="nav-item">
      <Link to={token?'/yourBoocking':'/singIn'}>Your bookings</Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn my-btn my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>

        </div>
        </Slide>
    )
}

export default NavBar
