import React from 'react'
import {faUsers ,faHotel} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
function Navigation() {
    return (
        <div className='navigation'>
            <div>
                <div></div>
                <ul>
                    <Link to='/mainPageAdmin/addNewAdmin'>
                        <li title='add a new admin' >
                            <FontAwesomeIcon  icon={faUsers}/>
                            <span>+</span>
                        </li>
                    </Link>
                    <Link to='/mainPageAdmin/AddHotel'>
                        <li title='add a new hotel' >
                            <FontAwesomeIcon  icon={faHotel}/>
                            <span>+</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Navigation
