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
import { Button } from '@material-ui/core';
import CheckPar from '../CheckPar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import OwenerNav from './OwenerNav';

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



function RoomBookings(props) {
    const classes = useStyles();
  
    return (
        
        <div >
                 <OwenerNav/>
              
                 <div className='yourBockingPage'>
                 <div className='yourBocking'>
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
           
            <TableCell align="center">User Role</TableCell>
            <TableCell align="center">Check In</TableCell>
            <TableCell align="center">Check Out</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">googleId</TableCell>
            <TableCell align="center">securityNumber</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {props.checks.map((row) => (
            <TableRow key={3}  className={classes.root}>
             
              <TableCell align="center">{row.user.role}</TableCell>
              <TableCell align="center">{row.checkIn}</TableCell>
              <TableCell align="center">{row.checkOut} </TableCell>
              <TableCell align="center">{row.user.fullName} </TableCell>
              <TableCell align="center">{row.user.email} </TableCell>
              <TableCell align="center">{row.user.googleId}</TableCell>
              <TableCell align="center">{row.user.securityNumber}</TableCell>

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

export default RoomBookings
