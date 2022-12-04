import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Navbar() {
    const {user , setUser} = React.useContext(LoginContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/login");
    }

    return (
        <div style={{display:"flex" , justifyContent:"space-around" , padding:"10px"}}>
           {/* <div style={{margin:0,marginTop:"0"}}> <h1>Todo</h1></div> */}
            <Link  style={{textDecoration:"none", fontSize:"20px", color:"royalblue",fontWeight:"800"}} to='/'>Homepage</Link>
            {
                user ? <Link  style={{textDecoration:"none", fontSize:"20px", color:"royalblue",fontWeight:"800"}} to = '/todo'>Todos</Link>:null
            }
            {
                user ? <button style={{textDecoration:"none",backgroundColor:"none", fontSize:"20px", color:"royalblue",fontWeight:"800",border:"none"}} onClick={handleLogout}>Logout</button> : <Link style={{textDecoration:"none", fontSize:"20px", color:"royalblue",fontWeight:"800"}} to='/login'>Login</Link>
            }
        </div>
    )
}

export default Navbar;


