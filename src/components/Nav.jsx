import React from 'react'
import '../styles/global.css'
import {Link} from 'react-router-dom'


const Nav = () => {
  return (
    <>
    <div className="nav-bar" >
        <div className="left">
            <h2>Pentaagon</h2>
        </div>
        <div className="right">
            <h2><Link to="/" style={{color : 'white' }}>HOME</Link></h2>
            <h2><Link to="/add"style={{ color : 'white'}} >ADD</Link></h2>
            <h2><Link to="/view" style={{color : 'white'}}>VIEW</Link></h2>
        </div>

    </div>
    
    
    
    </>
  )
}

export default Nav