import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import OwenerNav from './OwenerNav';
import { useParams } from 'react-router';

const useStyles = makeStyles({
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
});



function UserBooking() {
    const classes = useStyles();
    const [data,setData]=useState({})
    const [error,setError]=useState("")
    const [loading,setLoading] = useState(true);
    const params = useParams();
    const token = localStorage.getItem('tokenOwener');

useEffect(() => {
    window.scroll(0,0)
    axios.get(`http://localhost:8080/owner/getUsers/${params.userId}`,{
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
                 <OwenerNav/>
              
                 <div className='yourBockingPage'>
                 <div className='yourBocking'>
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
          <TableCell align="center">role</TableCell>
            <TableCell align="center">fullName</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">secuirtyNumber</TableCell>
            <TableCell align="center">googleId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
            <TableRow key={3}  className={classes.root}>
             
              <TableCell align="center">{data.user.role}</TableCell>
              <TableCell align="center">{data.user.fullName}</TableCell>
              <TableCell align="center">{data.user.email}</TableCell>
              <TableCell align="center">{data.user.securityNumber} </TableCell>
              <TableCell align="center">{data.user.googleId} </TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
           
            <TableCell align="center">Room Number</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {data.orders.map((row) => (
            <TableRow key={3}  className={classes.root}>
             
              <TableCell align="center">{row.room.number}</TableCell>
              <TableCell align="center">{row.room.price}</TableCell>
              <TableCell align="center">{row.checkIn}</TableCell>
              <TableCell align="center">{row.checkOut} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
           
            <TableCell align="center">evaluating</TableCell>
            <TableCell align="center">notes</TableCell>
            <TableCell align="center">suggestions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {data.notes.map((note) => (

            <TableRow key={3}  className={classes.root}>
             
              <TableCell align="center">{note.evaluating}</TableCell>
              <TableCell align="center">{note.notes}</TableCell>
              <TableCell align="center">{note.suggestions}</TableCell>
              </TableRow>
            ))}
         
        </TableBody>
      </Table>
    </TableContainer>
               
                 </div>
               
                 </div>
        </div>
    )
}

export default UserBooking
