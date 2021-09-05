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
import axios from 'axios';

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



function YourBockingPage() {
    const classes = useStyles();
    const [data,setData]=useState({})
    const [error,setError]=useState("")
useEffect(() => {
    window.scroll(0,0)
    axios.get("url").then((data)=>{
      setData(data)

    }).catch(error=>{
      setError(error)

    })
},[])
    return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {bocking.map((row) => (
            <TableRow key={3}  className={classes.root}>
              <TableCell component="th" scope="row">
                {row.hotel.name}
              </TableCell>
              <TableCell align="center">{row.hotel.country}</TableCell>
              <TableCell align="center">{row.room.number}</TableCell>
              <TableCell align="center">{row.room.price}</TableCell>
              <TableCell align="center">{row.checkIn}</TableCell>
              <TableCell align="center">{row.checkOut}</TableCell>
              <TableCell align="center"><Button disabled={Date.parse(row.checkIn) <new Date()} variant="contained" color="secondary">  cancellation</Button></TableCell>
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

export default YourBockingPage
