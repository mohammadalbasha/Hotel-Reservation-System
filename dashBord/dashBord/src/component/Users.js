import React ,{useState,useEffect} from 'react'
import users from '../users.json'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'
function Users(token) {
    const [myUsers,seUsers]=useState([])
        const [loading,setLoading] = useState(true);    

useEffect(() => { 
    axios.get("http://localhost:8080/admin/getUsers",{
        
        headers :{"authorization" :`Bearer ${token}`

            }
        })
    .then(res=>{
    seUsers(res.data);
    setLoading(false);    
    })
    .catch(error=>alert(error))

}, [loading]);

const blockingHandler = (id) => {
    axios.get(`http://localhost:8080/admin/blockingUser/${id}`,{
        
        headers :{"authorization" :`Bearer ${token}`

            }
        })
        .then (res=> {
            alert(res.data);
            setLoading(true);
        })
}
  
    return (
      !loading&&  <div className='usersPage'>
            <Navbar/>
             <div className='innerUsers'>
                <h1 className='usersHeader'>Users :</h1>
                <div className='users'>
                    { myUsers.map(user=><div className={`user border-${Math.floor(Math.random() * 5)+1}`}>
                        <div className='userInfo'>
                         <div>{user.fullName}</div>
                            <div>phoneNumber :{user.phoneNumber}</div>
                            <div>email :{user.email}</div>
                            <div>googleId :{user.googleId}</div>
                            <div type='button' className='block' onClick ={()=>{
                                blockingHandler(user._id)
                            }}>
                                {user.isActive?'block':'unblock'}
                                </div>
                            
                        </div>
                     
                      
                         <table className='orders'>
                         <tr>
                         <th>room number</th>
                         <th>price</th>
                         <th>chick in</th>
                         <th>chick out</th>
                         <th>hotel name</th>
                         <th>country</th>
                         </tr>
                         {user.orders.map(order=> <tr>
                          <td>{order.room.number}</td>
                          <td>{order.room.price}</td>
                          <td>{order.checkIn }</td>
                          <td>{order.checkOut }</td>
                          <td>{order.hotel.name }</td>
                          <td>{order.hotel.country }</td>
                          </tr> )
                           }
                          </table>
                        
                            
        
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Users
