import React ,{useEffect} from 'react'
import Advertising from '../Advertising'
import CheckPar from '../CheckPar'
import Corona from '../Corona'
import NavBar from '../NavBar'
import Filter from './Filter'
import Hotels from './Hotels'
import Navication from './Navication/Navication'
import Pagination from '@material-ui/lab/Pagination';

function HotelsPage() {
    
useEffect(() => {
    window.scroll(0,0)
},[])
    return (
        <>
        <div className='hotelPage'>
       <NavBar/>
       <CheckPar/>
         <div className='row'>
         <Navication />
         <Hotels />
         <div className='advertising col-lg-1 col-0  p-0' style={{marginTop: "13px"}}> <Advertising/></div>
        
         </div>
         <Pagination count={10} disabled  color="primary" />
        </div>
        </>
        
    )
}

export default HotelsPage
