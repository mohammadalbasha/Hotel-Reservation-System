import React, { useState } from 'react'
import { faCoffee, faGamepad, faShower, faSmoking, faTree, faWifi,faStar } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setRef,Modal, makeStyles ,Button} from '@material-ui/core';
import { Redirect } from 'react-router';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {faCalendarAlt }from '@fortawesome/free-solid-svg-icons'
import { Alert } from '@material-ui/lab';
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
  }));
function Room({room ,stars}) {
    
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [dir,setDir]=useState("")
    const [open,setOpen]=useState(false)
    const[error,setError]=useState("")
    const[res,setRes]=useState("")
    const check=JSON.parse(localStorage.getItem('check'))
    const[initialValues,setValues]=useState({
        checkIn:new Date(),
        checkOut:new Date(),
        id:room._id
    })
    const token=localStorage.getItem("token")
    const roomFeatures=[
        {icon:faWifi,name:"Free Wifi",type:"hasFreeWifi"},
        {icon:faShower,name:"Jacuzzi",type:"hasJacuzzi"},
     {icon:faCoffee,name:"Coffee Machine",type:"hasCoffeeMachine"},
        {icon:faTree,name:"Balcony",type:"hasBalcony"},
        {icon:faSmoking,name:"Smooking Rooms",type:"hasSmookingRooms"},
       {icon:faGamepad,name:"Games Hall",type:"hasGamesHall"}
    ]
    let k=[];
    for(let i=0;i<stars;i++){
        k.push("")
    }
    const bookHandler=()=>{
        setOpen(token?true:false) ;
        setDir(token?false:true);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("url",JSON.stringify(initialValues) )
        .then((res)=>{setRes(true)})
        .catch((error)=>{setError(error)})

    }
    return (
        dir?<Redirect to="/singIn"/>:

        <div className='room '>
                <div className='roomImg '>
                <img src={`http://localhost:8080/${room.imageUrl}`}></img>
                </div>
                <div className='roomInfo '>
                <h3> {room.type} </h3>
                <div className='stars'> {k.map(i=><span><FontAwesomeIcon className='stars'      icon={faStar}/></span>)}</div>

                 <p>Sleeping {room.size} people</p>
              
       
                </div>
                <div className='roomCheke ' onClick={bookHandler}>
                 
                
                <a className='booking'  style={{cursor:"pointer"}}> Book This Room {`>`}</a>
                
                </div>
                <div className='features'>
                 {
                roomFeatures.map((feature)=>
                ( room.features[feature.type] ? <li className='feature '>
                    <i><FontAwesomeIcon   icon={feature.icon}/></i>
                    <p>{feature.name}</p>              
                    
                </li>:""  ) 
                    )
                }
                 <div className='price'>{room.price}$</div>
                
                 </div>
                 <Modal
             open={open}
             onClose={()=>{setOpen(false)}}
             
             >
                 <div style={modalStyle} className={ classes.paper}>
                     <div className='addBook'>
                     <form  className={classes.root} onSubmit={submitHandler}  noValidate autoComplete="off" >
                         <div className='check m-2'>
            <p> Check In  </p>

            <DatePicker
                selected={initialValues.checkIn}
                onChange={(value)=>{setValues({...initialValues,checkIn:value})}}
                minDate={new Date()}
                name="checkOut"
            />
            </div>
            <div className='check m-2'>
            <p>Check Out   </p>
                <DatePicker 
                    selected={initialValues.checkOut}
                    onChange={(value)=>{setValues({...initialValues,checkOut:value})}}
                    minDate={initialValues.checkIn}
                    name="checkOut"

                />
            </div>
            <Button type="submit" variant="contained" color="secondary">
                        Book
                        </Button>
                         </form>
                         {error&&<Alert severity="error">
                                    There is something wrong <strong>{error.message}</strong>
                                    </Alert>}
                                    { res&&<Alert severity="success">
                                    <strong>  You have successfully Booking !</strong>
                                    </Alert>}
                     </div>
                    
                
                </div>
         
                
             </Modal>
                 {/* <Modal
             open={error}
             onClose={()=>{setError("")}}
             
             >
                 <div>
                 {error}
                 </div>
                
             </Modal>
                 <Modal
             open={res}
             onClose={()=>{setRes("")}}
             
             >
                Successfully booked
             </Modal> */}
            </div>
    )
}

export default Room
