
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
import users from '../../users.json'
import { Button } from '@material-ui/core';
import CheckPar from '../CheckPar'
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


function Guests() {
    const classes = useStyles();
    const [data,setData]=useState({})
    const [error,setError]=useState("")
    const token = localStorage.getItem('tokenOwener');
    const [loading,setLoading]= useState(true);

    useEffect(() => {
    window.scroll(0,0)
    axios.get("http://localhost:8080/owner/getUsers",{
      headers : {
        'Authorization' : `bearer ${token}`
      }
    }).then((res)=>{
      setData(res.data);
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
          <TableCell align="center">Role</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">phoneNumber</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">googleId</TableCell>
            <TableCell align="center">securityNumber</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* data.map  */}
          {data.map((row) => (
            <TableRow key={3}  className={classes.root}>
              <TableCell align="center">{row.role}</TableCell>
             <TableCell align="center">{row.fullName}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.googleId}</TableCell>
              <TableCell align="center">{row.securityNumber}</TableCell>
              <Link to={`/UserBooking/${row._id}`}><TableCell align="center"><Button  variant="contained" color="secondary">  detail</Button></TableCell></Link>             </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                 </div>
               
                 </div>
        </div>
    )
}

export default Guests
