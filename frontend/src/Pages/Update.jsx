import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

function Update() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: ''
  });

  const navigate = useNavigate();
  
  useEffect(() =>{
   axios.get(`http://localhost:3001/${id}`)
   .then((res)=>{
      setStudent(res.data);
   })
   .catch((err)=>{
    console.log(err);
   })

  },[]);

  const id = useParams().id;

  const changeHandling = (e) =>{
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  const submitHandling = (id) =>{
    axios.put(`http://localhost:3001/update/${id}`, student)
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
        <h1>Update Student</h1>
        <div>
          <form action="">
            <input type="text" name='name' value={student.name} placeholder='Name' onChange={changeHandling} />
            <br />
            <input type="email" name='email' value={student.email} placeholder='Email' onChange={changeHandling} />
            <br />
            <input type="number" name='age' value={student.age} placeholder='Age' onChange={changeHandling} />
            <br />
            <button onClick={()=>submitHandling(student.id)}>Update Student</button>
          </form>
        </div>
    </>
  )
}

export default Update