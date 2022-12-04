import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Todos() {
    const [todos, setTodos] = React.useState([])
    const [input, setInput] = React.useState('')
    const [status, setstatus] = React.useState('')
    const [tag, settag] = React.useState('')
    const token = localStorage.getItem('token');
    const [update, setUpdate] = React.useState(false);
    const [newinput, setnewInput] = React.useState('')
    const [newStatus, setNewStatus] = React.useState('')
    const [newTag,setNewTag] = React.useState('')
    const navigate = useNavigate();

    const handleAdd = async () => {
        const body = {
            title: input,
            status,
            tag
        }
        console.log(body)
        try {
            await fetch('https://mern-todo-backend-two.vercel.app/createTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });            // console.log(response)
            setInput('');
            setstatus('');
            settag('');
            getAllTodos();
            // setNotes(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTodos = async () => {
        try {
            let data = await fetch('https://mern-todo-backend-two.vercel.app/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            console.log(data)
            let response = await data.json();
            console.log(response);
            // setNotes(response)
            if (typeof response === 'object') {
                setTodos(response)
            }
            else {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            let data = await fetch('https://mern-todo-backend-two.vercel.app/deleteTodo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id: id
                })
            });
            let res = await data.json();
            alert(res.message);
            getAllTodos();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id) => {
        try {
            let data = await fetch('https://mern-todo-backend-two.vercel.app/updateTodo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id: id,
                    title: newinput,
                    status: newStatus,
                    tag: newTag
                })
            });
            let res = await data.json();
            alert("todo updated");
            setnewInput('');
            setNewStatus('');
        setNewTag('');
            getAllTodos();
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        getAllTodos();
    }
        , []);


    return (
        <div style={{display:"flex", justifyContent:"space-around"}}>
          <div  style={{marginTop:"80px", height:"300px",width:"400px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}} >
          <div  >
            
            <TextField  style={{marginTop:"20px"}} label="Title"   type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <br />
             <br />
            <TextField label="Status" type="text" value={status} onChange={(e) => setstatus(e.target.value)} />
            <br />
            <br />
            <TextField label="Tag" type="text" value={tag} onChange={(e) => settag(e.target.value)} />
           <br />
            <Button style={{marginTop:"10px"}} variant="contained" onClick={handleAdd}>ADD</Button>
        </div>
          </div>
            <div style={{marginTop:"70px"}}>
                {todos?.map((todos, index) => {
                    return <div style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}  key={index}>
                        <p style={{fontWeight:"900", fontSize:"20px", color:"red"}}>Title : {todos.title}</p>
                        <p style={{fontWeight:"900", fontSize:"20px", color:"red"}}>Status : {todos.status}</p>
                        <p style={{fontWeight:"900", fontSize:"20px", color:"red"}}>Tag : {todos.tag}</p>
                        <div style={{display:"flex",width:"200px",justifyContent:"space-between"}}><Button  variant="contained"  onClick={() => { handleDelete(todos._id) }}>DELETE</Button>
                        <Button variant="contained"  onClick={() => { setUpdate(true) }}>UPDATE</Button></div>
                        <div  style={{marginTop:"10px"}}>
                            {
                                update ?
                                    <div  style={{marginTop:"10px", width:"200px", justifyContent:"space-between"}}>
                                        
                                        <TextField label="Title" type="text" value={newinput} onChange={(e) => setnewInput(e.target.value)} /><br/>
                                        <br/>
                                        
                                        <TextField label="Status" type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
                                        <br />
                                        <br />
                                        <TextField label="Tag" type="text" value={newTag} onChange={(e) =>setNewTag(e.target.value)} />
                                        <br />
                                        <br />
                                        <div style={{display:"flex",width:"200px",justifyContent:"space-between"}}>
                                        <Button variant="contained" onClick={() => { setUpdate(false); getAllTodos() }}>CANCEL</Button>
                                        <Button variant='contained' onClick={() => { handleUpdate(todos._id); setUpdate(false); getAllTodos() }}>UPDATE</Button>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Todos