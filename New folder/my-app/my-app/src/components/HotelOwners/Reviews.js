import React ,{useEffect, useState}from 'react'
import myNotes from '../../myNotes.json'
import axios from 'axios'

function Reviews() {
    const [notes,setNotes]=useState(myNotes)
    const token = localStorage.getItem('tokenOwener');
    const [loading,setLoading] = useState(true);
 
    useEffect(() => {
        window.scroll(0,0)
        axios.get('http://localhost:8080/owner/getNotes',{
            headers : {
                'Authorization' : `bearer ${token}`
            }
        })
        .then(res=>{
            setNotes(res.data);
            setLoading(false);
        })
        .catch(error=>{
     
        })
    }, [])
    return (
        !loading&&
        <div className='reviews'style={{position:"relative",color:"#fff" , margin:"20px 100px"}}>
            <h4>Reviews :</h4>
           {notes.map(note=><div  style={{margin:"20px 0",borderBottom:"1px solid"}}>
            <p className='notes'><span  className='evaluating'>{note.evaluating}</span><span >{note.notes}</span></p>
            <p><span style={{fontWeight:"bold", marginLeft:"30px" ,marginRight:"5px"}}>Suggestions:</span>{note.suggestions}</p>
           </div>)}
        </div>
    )
}

export default Reviews
