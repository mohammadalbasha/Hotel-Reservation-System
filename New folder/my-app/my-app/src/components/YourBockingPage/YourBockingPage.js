import React,{useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavBar from '../NavBar'
import bocking from '../../bocking.json'
import { Button } from '@material-ui/core';
import CheckPar from '../CheckPar'
import axios from 'axios';
import { Modal, makeStyles} from '@material-ui/core';
import Rooms from './Rooms';

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
  width: 550,
  backgroundColor:"#f8f8f8",
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  
  padding: theme.spacing(2, 4, 3),
  marginTop:"20px"
},
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: '#eee',
    color: '#fff',
  },
  body: {
    fontSize: 14,
  },
  root: {
  
    '&:nth-of-type(even)': {
      backgroundColor: '#eeeeee36',
    },
  }
}));



function YourBockingPage() {
  const [open,setOpen]=useState(false)
  const [openCancellation,setOpenCancellation]=useState(false)
  const [orderId,setOrderId]=useState("")
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);  
    const [data,setData]=useState([...bocking])
    const token = localStorage.getItem('token');
    const [error,setError]=useState("")
    const [loading,setLoading] = useState(true);
    const cancellation=()=>{
      axios.get(`http://localhost:8080/reservation/cancellingOrder/${orderId}`,{
        headers : {
          'Authorization' : `bearer ${token}`
        }
      })
      .then((res)=>{
        alert(res);
      })
      .catch(err => {
        alert(err);
      })

    }
useEffect(() => {
    window.scroll(0,0)
    axios.get("http://localhost:8080/reservation/getMyOrders",{
      headers : {
        'Authorization' : `bearer ${token}`
      }
    }).then((res)=>{
      setData(res.data)
      setLoading(false);

    }).catch(error=>{
      setError(error)

    })
},[])
    return (
      !loading&&
        <div >
                 <NavBar/>
              
                 <div className='yourBockingPage'>
                 <CheckPar/>
                 <div className='yourBocking'>
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Hotel Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="center">Room Number</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
            <TableCell align="center">cancellation of reservation</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {data.map((row) => (
            <TableRow key={3}  className={classes.root}>
              <TableCell component="th" scope="row">
                {row.hotel.name}
              </TableCell>
              <TableCell align="center">{row.hotel.country}</TableCell>
              <TableCell align="center">{row.room.number}</TableCell>
              <TableCell align="center">{row.room.price}</TableCell>
              <TableCell align="center">{row.checkIn}</TableCell>
              <TableCell align="center">{row.checkOut}</TableCell>
              <TableCell align="center"><Button onClick={()=>{setOrderId(row._id);setOpenCancellation(true)}}disabled={Date.parse(row.checkIn) <new Date()} variant="contained" color="secondary">  cancellation</Button></TableCell>
              <TableCell align="center"><Button onClick={()=>{setOrderId(row._id);setOpen(true)}} disabled={Date.parse(row.checkIn) <new Date()} variant="contained" color="secondary">  edit</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                 </div>
               
                 </div>
                 <Modal
             open={open}
             onClose={()=>{setOpen(false)}}
             
             >
                 <div style={modalStyle} className={ classes.paper}>
                   <Rooms orderId={orderId}/>
                 </div>
                   </Modal>
                 <Modal
             open={openCancellation}
             onClose={()=>{setOpenCancellation(false)}}
             
             >
                 <div style={modalStyle} className={ classes.paper}>
                   <h6>Do you really want to cancel the reservation?</h6>
                <Button onClick={cancellation} variant="contained" color="secondary">  cancellation</Button>

                 </div>
                   </Modal>
        </div>
    )
}

export default YourBockingPage
