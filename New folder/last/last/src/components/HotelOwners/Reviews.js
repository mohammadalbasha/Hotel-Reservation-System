import React from 'react'

function Reviews({notes}) {
    return (
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
