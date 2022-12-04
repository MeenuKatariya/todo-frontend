import React from 'react'
import { LoginContext } from '../../Context/LoginContext';

function Homepage() {
  const {user} = React.useContext(LoginContext);
  return (
    <div >
        <img width="80%"  style={{margin:"20px"}} height="100%" src="https://media.gettyimages.com/id/1168122629/photo/todo.jpg?s=612x612&w=gi&k=20&c=Ap18uB6Fv1_3z1vokZeX_Bv9JHNAEKjHncJ39yrBKjY=" alt="" />
        <div style={{textDecoration:"none", fontSize:"20px", color:"red",fontWeight:"800",marginTop:"30px"}} className='user-box'>
            {
                user  ? "User login" : ""
            }
        </div>
    </div>
  )
}

export default Homepage