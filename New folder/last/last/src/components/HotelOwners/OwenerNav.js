import { makeStyles, Slide, useScrollTrigger } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import EditFeatures from './EditFeatures';

const useStyles = makeStyles({
    nav:{
        background:"rgba(0, 0, 0, 0.82)"
    }
  });
function OwenerNav({window}) {
    const classes = useStyles();
    const [open,setOpen]=useState(false)
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
   useEffect(() => {

   }, [])
    return (
      <Slide  appear={false} direction="down" in={!trigger}>
          <div className='ownerNav'>
          <div className='navbar  navbar-expand-lg '>
              <Link to="/"><a class="navbar-brand" href="#">Fly<span>Now</span></a></Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i style={{color:"orang"}} class="fa fa-bars" aria-hidden="true"></i></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
       <Link to='/MainPageOwener'>Your Hotel</Link>
      </li>
    
      <li class="nav-item ">
       <Link to='/guests'>Guests</Link>
      </li>
      <li class="nav-item " onClick={()=>{setOpen(true)}} style={{cursor:"pointer"}}>
      <a >Edit Features</a> 
      </li>
    
    </ul>
  
  </div>

        </div>
        <EditFeatures open={open} setOpen={setOpen}/>
          </div>
    
        </Slide>
    )
}

export default OwenerNav
