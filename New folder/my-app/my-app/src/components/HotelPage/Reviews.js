import { Button, Modal, TextField } from '@material-ui/core'
import React ,{useEffect, useState}from 'react'
import MyModal from '../MyModal'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import {useParams} from 'react-router-dom'
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
  
function Reviews() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [error,setError]=useState("")
    const [suc,setSuc]=useState(false)
    const [open,setOpen]=useState(false)
    const [openAdd,setOpenAdd]=useState(false)
    const params = useParams();
    const token = localStorage.getItem('token');

    const [data,setData]=useState({
        evaluating:5,
        notes:"",
        suggestions:""
    });
    const [notes,setNotes]=useState([]);
    const [loading,setLoading] = useState(true);
 
    useEffect(() => {
        window.scroll(0,0)
        axios.get(`http://localhost:8080/reservation/getNotes/${params.id}`)
        .then(res=>{
            setNotes(res.data);
            setLoading(false);
        })
        .catch(error=>{
     
        })
    }, [])
    const changHandler=(e,type)=>{
        setData({...data,[type]:e.target.value})
    }
      const submitHandler=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/reservation/addNote/${params.id}`,data,{
          headers : {
            'Authorization' : `bearer ${token}`
          }
        })
        .then((res)=>{
          setSuc(true)})
        .catch((error)=>{
         setError(error.response.data.message)})
    }
    const allReviews=
    <div  className='reviews'>
        <h5>Reviews:</h5>
        {notes.map(note=> <p className='notes'><span className='evaluating'>{note.evaluating}</span>{note.notes} <br/> {note.suggestions}</p>  )}
     </div>
     const addReview=
     <div style={modalStyle} className={classes.paper } >
         <form className='addReviews' onSubmit={submitHandler} >
         <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Evaluating</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={data.evaluating}
          onChange={(e)=>{changHandler(e,"evaluating")}} 
                    label="evaluating"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[1,2,3,4,5].map(i=> <MenuItem value={i}>{i}</MenuItem>  )}
          
        </Select>
      </FormControl>

      <TextField id="outlined-basic"  label="Notes" variant="outlined" value={data.notes}  onChange={(e)=>{changHandler(e,"notes")}} className={classes.formControl}/>
      <TextField id="outlined-basic"  label="Suggestions" variant="outlined" value={data.suggestions}  onChange={(e)=>{changHandler(e,"suggestions")}} className={classes.formControl}/>
      <Button variant="contained" color="secondary" type='submit' className={classes.formControl}> Submit </Button>
      {error&&<Alert severity="error" className={classes.formControl}>
                                    <strong>{error}</strong>
                                    </Alert>}
                                    { suc&&<Alert severity="success" className={classes.formControl}>
                                    <strong>  You have successfully add Note !</strong>
                                    </Alert>}

         </form>
         </div>
        

    return (
        !loading?
        <div className='reviews'>
            <h5>Reviews:</h5>
            {notes.length&& <p className='notes'><span className='evaluating'>{notes[0].evaluating}</span>{notes[0].notes}</p>}
            <p className='see' onClick={()=>{setOpen(true)}}>see all reviews {`>`}</p>
            <Button variant="contained" color="secondary" onClick={()=>{setOpenAdd(true)}}> add review </Button>
            <MyModal open={open} setOpen={setOpen} body={allReviews}/>
            <Modal open={openAdd}  onClose={()=>{setOpenAdd(false)}}>
                {addReview}
            </Modal>
            
        </div>
        : 'Loading'
    )
}

export default Reviews
