import React, { useState ,useEffect} from 'react'
import { Button, ButtonGroup, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import AddBook from './AddBook';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import GraphicLine from './Svg/graphicLine'
import EditRoomInfo from './EditRoomInfo';
import axios from 'axios';
import DisableRoom from './DisableRoom';
import RoomBookings  from './roomBookings';
function getModalStyle() {
    
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    
    icon:{
      position:"absolute ",
      right: "4px",
      top: "5px",
      zIndex: "100",
      color: "#ac1717",
      background: "#fff",
      padding: '3px',
      borderRadius: "50%",
      cursor:"pointer"

    },
   
  }));
  
function Room({room}) {
  console.log(room);
    const[openBook,setOpenBook]=useState(false)
    const[openBookings,setOpenBookings]=useState(false)
    const [openSummary,setOpenSummary] = useState(false);
    const[data,setData] = useState();
    const token = localStorage.getItem('tokenOwener');

    const[openEdit,setOpenEdit]=useState(false)
    const[openDisable,setOpenDisable]=useState(false)
    const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [loading,setL]= useState(true);
  useEffect(()=>{
    window.scroll(0,0)
      axios.get(`http://localhost:8080/owner/getRoomReservationSummary/${room.number}`,{
        headers : {
          'Authorization' : `bearer ${token}`
        }
      })
      .then(res=>{
          setData(res.data);
          console.log(res.data);
          setL(false);

      })
      
      .catch(error=>{
        alert(error);
        localStorage.removeItem('tokenOwener');

      })

      
  },[])

  

  
    return (
        <div className='room'>
          <i onClick={()=>{setOpenEdit(true)}} className={classes.icon}><EditIcon/></i>
        <div className='img'>
            <img src={`http://localhost:8080/${room.imageUrl}`}></img>
            <p> #{room.number}</p>

            </div>
             <ButtonGroup variant="contained" color="secondary"  aria-label="contained primary button group">
             <Button onClick={()=>{setOpenBook(true)}}>Book</Button>
             <Button   onClick={()=>{setOpenDisable(true)}}>Disable</Button>
            <Button onClick={()=>{setOpenBookings(true)}}> Bookings  </Button>
            <Button onClick={()=>{setOpenSummary(true)}}> Summary  </Button>

             </ButtonGroup>


             <Modal
             open={openBook}
             onClose={()=>{setOpenBook(false)}}
             
             >
                 <div style={modalStyle} className={classes.paper}>
                     <AddBook room={room}/>
                 </div>

             </Modal>
             <Modal
             open={openBookings}
             onClose={()=>{setOpenBookings(false)}}
             
             >
                 <div style={modalStyle} className={classes.paper}>
                     
                          <RoomBookings checks = {room.checks}/>

                     
                 </div>

             </Modal>
             <Modal
             open={openDisable}
             onClose={()=>{setOpenDisable(false)}}
             
             >
                 <div style={modalStyle} className={classes.paper}>
                     <DisableRoom room={room}/>
                 </div>

             </Modal>
             <Modal
             open={openSummary}
             onClose={()=>{setOpenSummary(false)}}
             
             >
                  {!loading&&    <div className='chart col-8 p-0 m-0'>   <GraphicLine data={data}/></div>}


             </Modal>
             <Modal
             open={openEdit}
             onClose={()=>{setOpenEdit(false)}}
             
             >
                <div style={modalStyle} className={classes.paper}>
                     <EditRoomInfo room={room} />
                     </div>

              </Modal>


            

        
    </div> 
    )
}

export default Room
