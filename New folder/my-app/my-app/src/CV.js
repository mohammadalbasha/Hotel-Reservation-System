import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen, faMap, faMapMarked, faMapMarker, faMobile, faMobileAlt, faVoicemail }from '@fortawesome/free-solid-svg-icons'
function CV() {
    return (
        <div className='cv row'>
            <div className='left col-3'>
                <div className='conact'>
                <h2>CONATACT</h2>
                 <p><span><FontAwesomeIcon icon={faEnvelopeOpen}/></span>moazalbari77@gmail.com</p>
                 <p><span><FontAwesomeIcon icon={faMobileAlt}/></span>+963932244969</p>
                 <p><span><FontAwesomeIcon icon={faMapMarker}/></span>Syria - Damascuse -Middan</p>
                 <p><span className='in'>in</span>Mouaz ALbari</p> 
                </div>

                <div className='maimnSkils'>
                    <h2>Main skils</h2>
                    <h6>React Js</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 

                    <h6>React-Redux</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "85%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                                     
                         <h6>Javascript {`&`} ES6</h6>
                         <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                       
                         
                         <h6>OOP</h6>
                         <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                         <h6>data structures and algorithms  </h6>
                         <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 

                  

                    <h6>HTML5</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 

                    <h6>CSS3</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 

                    <h6>SASS</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "70%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                    <h6>bootstrap</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                    <h6>jquery</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "20%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                    <h6>matirial ui</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                     
                    <h6>SQL</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                   
                     
                    <h6>git {`&`} gitHup</h6>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                   

                </div>
                <div className='skils'>
                    <h2></h2>
                   <h6> English </h6>
                   <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                   
                   <h6>Working in a team</h6>
                   <div class="progress">
                      <div class="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                     </div> 
                  
                   
                </div>
            </div>
            <div className=' right col'>
                <div className='name'>
                    <h1>Mouaz ALbari</h1>
                    <h5>Front_End devloper</h5>

                </div>
                <div className='summary'>
                    <h3>SUMMARY</h3>
                    <ul>
                        <li>In the fourth year at the Faculty of Software Engineering, Damascus University</li>
                        <li>experience in building and maintaining websites useing Reactjs </li>
                        <li>knowledge in  data structures and algorithms </li>
                        <li>Good interpersonal skills to build good Working relationships </li>
                        <li>Fast learner</li>
                    </ul>
               
                </div>

                <div className='experience'>
                    <h3>EXPERIENCE WITH :</h3>
                    
                   
                   
                    <ul>
                          
                        <li>Building stable and maintainable codeases useing React js</li>
                        <li>Useing react-redux to state mangment </li>
                        <li>Send post request and get response useing axios</li>
                        <li>Implement authentication </li>
                        <li>react-router  </li>
                       
                        <li>Nice and responsive designs using modern library like : BootStrap , Material ui ....</li>
                        <li>use Git {`& `}Github</li>
                    
                    </ul>

                </div>
                <div className='projects'>
                    <h3>PROJECTS :</h3>
                        {/* <li>E-Commerces</li> */}
                        {/* <li>Company websites</li> */}
                       <h4>hotel booking site</h4>
                       <h5>functions :</h5>
                       <ul>
                       <li>Search for hotels in the specified country and date </li>
                       <li>Sort and filter hotels </li>
                       <li>best offers </li>
                       <li>sign in </li>
                       <li>sign in with google</li>
                       <li>Implement authentication </li>
                       <li>Possibility to see previous bookings </li>
                       <li>Possibility to cancel existing bookings </li>
                       </ul>
                      
                       <a href='https://awesome-varahamihira-29fdae.netlify.app/'target="_blank" >click to see Project</a>
                       <h4>Dashboard</h4>
                       <h4>A section for hotel owners</h4>
                      

                </div>
            </div>
            <div></div>
        </div>
    )
}

export default CV
