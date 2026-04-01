import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
function AddStudent() {
  const [students, setStudents] = useState({
    name: '',
    email: '',
    age: ''
  });
const navigate = useNavigate();  
  const changeHandler = (e)=>{
    setStudents({
      ...students,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/add', students)
    .then((res)=>{
      console.log(res);
      navigate('/');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
        <h1>Add Student</h1>
        <div>
          <form action="">
            <input type="text" name='name' placeholder='Name' onChange={changeHandler} />
            <br />
            <input type="email" name='email' placeholder='Email' onChange={changeHandler} />
            <br />
            <input type="number" name='age' placeholder='Age' onChange={changeHandler} />
            <br />
            <button onClick={submitHandler}>Add Student</button>
          </form>
        </div>
    </>
  )
}

export default AddStudent