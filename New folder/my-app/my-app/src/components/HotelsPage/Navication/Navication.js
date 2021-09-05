import { Button, Divider, Hidden, SwipeableDrawer } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HotelFeature from './HotelFeature'
import Map from './Map'
import PriseFilter from './PriseFilter'
import RoomsFeature from './RoomsFeature'
import StarRate from './StarRate'
import { useDispatch } from 'react-redux';
import {filterHotels} from '../../../redux'

function Navication() {
    const  dispatch = useDispatch()
    const [left, setLeft] = React.useState(false);

    
    const [state,setState]=useState({
        features:{
            hasRestaurant:false,
            hasSwimmingPool:false,
            hasCinema:false,
        },
        roomsFeature:{
            hasCoffeeMachine:false,
            hasBalcony:false,
            hasJacuzzi:false,
        },
        stars:"5",
        price:[0,500]
    })
    const nav =()=>{
        return(
            <>
            <Map/>
            <HotelFeature state={state} features={state.features} setState={setState}/>
            <Divider />

            <RoomsFeature state={state} roomsFeature={state.roomsFeature} setState={setState}/>
            <Divider />

            <PriseFilter state={state} price={state.price} setState={setState}/>
            <Divider />

            <StarRate  state={state} stars={state.stars} setState={setState}/>
            </>
        )
    }
    useEffect(()=>{
        dispatch(filterHotels(state))
    },[state])
    return (
        <nav  className='col-xl-3 col-md-4 col-sm-4 navication'>
             {/* <Hidden smUp implementation="css">
             <span onClick={()=>{setLeft(!left)}}>ok</span>

             </Hidden> */}
                    <Hidden xsmDown implementation="css">
           { nav()}
             </Hidden>
                 {/* { left ?nav():""} */}

{/*           
        <React.Fragment >
          <Button onClick={toggleDrawer(left, true)}>left</Button>
          <SwipeableDrawer
            left={left}
            open={left}
            onClose={toggleDrawer(left, false)}
            onOpen={toggleDrawer(left, true)}
          >
            {nav()}
          </SwipeableDrawer> */}
        {/* </React.Fragment> */}

        </nav>
    )
}

export default Navication
