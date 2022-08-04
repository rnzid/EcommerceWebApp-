import React from 'react'
import { Fragment } from 'react'
//import { Navigate } from 'react-router-dom';

const Home = () => {
  /* const token = localStorage.getItem("access_token")
  //console.log(token);
  let loggedin = true;
  if (token==null) {
    loggedin=false
    return <Navigate to="/login"/>
  } */
 
  return (
    <Fragment>
        
            <br/><br/>
        <h1>Welcome to the homepage!</h1>
        <p>You can do this, I believe in you.</p>
    
    </Fragment>
  )
}

export default Home