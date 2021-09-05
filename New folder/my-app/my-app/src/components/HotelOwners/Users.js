
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import users from '../../users.json'
import { Button } from '@material-ui/core';
import axios from 'axios';
import OwenerNav from './OwenerNav';
import { Link } from 'react-router-dom';

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



function Users() {
    const classes = useStyles();
    const [data,setData]=useState({})
    const [error,setError]=useState("")
useEffect(() => {
    window.scroll(0,0)
    axios.get("http://localhost:8080/owner/getUsers").then((data)=>{
      setData(data)

    }).catch(error=>{
      setError(error)

    })
},[])
    return (
        <div >
               
               <OwenerNav/>

                 <div className='yourBockingPage'>
                 <div className='yourBocking'>
                     {/* <h3>Users booking</h3> */}
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">phoneNumber</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {users.map((row) => (
            <TableRow key={3}  className={classes.root}>
             
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.checkIn}</TableCell>
              <TableCell align="center">{row.checkOut}</TableCell>
             <Link to="/UserBooking"><TableCell align="center"><Button  variant="contained" color="secondary">  See all booking</Button></TableCell></Link> 
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

export default Users


