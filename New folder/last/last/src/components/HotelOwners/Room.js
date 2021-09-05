import React, { useState } from 'react'
import { Button, ButtonGroup, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import AddBook from './AddBook';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import EditRoomInfo from './EditRoomInfo';
import axios from 'axios';
import DisableRoom from './DisableRoom';
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
    const[openBook,setOpenBook]=useState(false)
    const[openEdit,setOpenEdit]=useState(false)
    const[openDisable,setOpenDisable]=useState(false)
    const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  
  
    return (
        <div className='room'>
          <i onClick={()=>{setOpenEdit(true)}} className={classes.icon}><EditIcon/></i>
        <div className='img'>
            <img src={room.imagesUrl[0]}></img>
            <p> #{room.number}</p>

            </div>
             <ButtonGroup variant="contained" color="secondary"  aria-label="contained primary button group">
             <Button onClick={()=>{setOpenBook(true)}}>Book</Button>
             <Button   onClick={()=>{setOpenDisable(true)}}>Disable</Button>
            <Button> <Link to="/UsersBookThisRoom">see all booking</Link> </Button>
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
             open={openDisable}
             onClose={()=>{setOpenDisable(false)}}
             
             >
                 <div style={modalStyle} className={classes.paper}>
                     <DisableRoom room={room}/>
                 </div>

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
