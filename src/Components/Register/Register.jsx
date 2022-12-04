import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    // const [alert,setAlert] =React.useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
            name,
            image:"https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
        }

        try {
            let data = await fetch('https://mern-todo-backend-two.vercel.app/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            let res = await data.json();

            if(res.message){
                alert(res.message)
                // setAlert(true)

            }
            else{
                alert("User created successfully")
                // setAlert(true);
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
       
        <div  >
           
        
                 <div style={{ width:"300px",margin:"auto",height:"400px",marginTop:"40px",boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} >
                 <h2>Sign up</h2>
                 <TextField style={{marginTop:"10px"}} id="outlined-basic" label="Name"  type="text" name="name"  variant="outlined"value={name} onChange={(e) => { setName(e.target.value) }} />  
                 <br /><br />
                   <TextField id="outlined-basic" label="Email"  type="text" name="email"  variant="outlined"value={email} onChange={(e) => { setEmail(e.target.value) }} /><br /> <br />
                <TextField id="outlined-basic" label="Password"  type="password" name="password"  variant="outlined"value={password} onChange={(e) => { setPassword(e.target.value) }} /><br /><br />
            
                <Button  onClick={handleRegister} type="submit" variant="contained">Register</Button><br />
            <Link style={{marginTop:"10px",textDecoration:"none", color:"GrayText"}} to='/login'>Already have an Account</Link>
                 </div>
        </div>
    )
}

export default Register