import React ,{useEffect, useState} from 'react'
import InfiniteCarousel from 'react-leaf-carousel';
import HotelCard from './HotelCard';
import hotels from '../../hotels.json'
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  
  
  icon:{
  
    fontSize:" 27px",
    cursor: "pointer",
    color: "#eb7e29",

  },
 
}));
function HotelsSall() {
  const [error,setError]=useState("")
    const [hotelsSall,setHotels] =useState([...hotels])
    const[openEdit,setOpenEdit]=useState(false)
    const classes = useStyles();

    useEffect(() => {
      axios.get("url" )
        .then((res)=>{setHotels(res)})
        .catch((error)=>{setError(error)})
    
    }, [])
    
    return (
        <div className='hotelSallSection'>
            <header>   best offers :  <span>all  <i onClick={()=>{setOpenEdit(true)}} className={classes.icon}><EditIcon/></i>
</span>
 </header>
            <InfiniteCarousel
              breakpoints={[
            
                {
                  breakpoint: 767.98,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 991.98,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
              ]}
            slidesToShow={3}

         

            >
                {
                    hotelsSall.map(hotel=> <HotelCard hotel={hotel}/>)
                }
            </InfiniteCarousel>
        </div>
    )
}

export default HotelsSall
