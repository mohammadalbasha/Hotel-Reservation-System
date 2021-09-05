import React ,{useEffect, useState} from 'react'
import InfiniteCarousel from 'react-leaf-carousel';
import HotelCard from './HotelCard';
import hotels from '../../hotels.json'
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { Button, ButtonGroup, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
function getModalStyle() {
    
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  
  icon:{
  
    fontSize:" 27px",
    cursor: "pointer",
    color: "#eb7e29",

  },
 
}));

function HotelsSall() {
  const [error,setError]=useState("")
    const [hotelsSall,setHotels] =useState([...hotels])
    const [loading,setLoading] = useState(true);
    const[openEdit,setOpenEdit]=useState(false)
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const[country,setCountry]=useState("")
    const[nowCountry,setNowCountry]=useState("")
   const EditCountry=(e)=>{
     setLoading(true);
     e.preventDefault()
     setNowCountry(country);
     axios.get(`http://localhost:8080/reservation/getHotels/?offers=1&country=${country}`)
     .then(res=>{
      setHotels(res.data.Hotels);
      setLoading(false);
      setOpenEdit(false);

   })
   .catch((error)=>{setError(error)})


  }

    useEffect(() => {
      axios.get("http://localhost:8080/reservation/getHotels" )
        .then((res)=>{setHotels(res.data.Hotels)
          setLoading(false);

        })
        .catch((error)=>{setError(error)})
    
    }, [])
    
    return (
      !loading&&
        <div className='hotelSallSection'>
            <header>   best offers :  <span>{nowCountry}  <i onClick={()=>{setOpenEdit(true)}} className={classes.icon}><EditIcon/></i>
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
            
            <Modal
             open={openEdit}
             onClose={()=>{setOpenEdit(false)}}
             
             >
                 <div style={modalStyle} className={classes.paper}>
                   <form onSubmit={EditCountry}  className={classes.root}>
                     <h6>Which country do you want?</h6>
                   <TextField value={country}   onChange={(e)=>{setCountry(e.target.value)}} label="Full Name" variant="outlined" />
                   <Button type="submit" variant="contained" color="secondary">
                        submit
                        </Button>
                   </form>

                 </div>

             </Modal>
        </div>
    )
}

export default HotelsSall
