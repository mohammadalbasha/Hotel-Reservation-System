import React, { useState ,useRef} from 'react'

function UploadImg({setImg, imgs,i,imgsData=[],setImgData}) {


    // const inputRef = useRef(null)
    const changeHandler=(e)=>{
        setImg([...imgs.slice(0,i),e.target.files[0],...imgs.slice(i+1)])
        const fd=new FormData();
        fd.append("image",imgs[i]);
        setImgData([...imgsData.slice(0,i),fd,...imgsData.slice(i+1)])
    }
    return (
        <div className='col-3'>
     <input  type='file' name={`imegs[${i}]`} style={{display:""}}   onChange={changeHandler} />
        </div>
    )
}

export default UploadImg
