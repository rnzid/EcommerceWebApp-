import React, { Fragment } from 'react'
import Login from './Login';


const Logout = () => {
    const toc=localStorage.removeItem("access_token")
    console.log(toc);
  return (
    <Fragment>
        <Login/>
    </Fragment>
  )
}

export default Logout