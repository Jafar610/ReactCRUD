import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

function Update() {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: ''
    })

    const id = useParams().id;
    const navigate = useNavigate();

    const changeHandling = (e) =>{
        setStudent({
          ...student,
          [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:3002/' + id)
        .then((res)=>{
            setStudent(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })
    }, [])

    const submitHandling = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:3002/update/' + id, student)
        .then((res)=>{
          console.log(res.data);
          navigate('/');
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  return (
    <>
    <h1>Update Student</h1>

    <form onSubmit={submitHandling} >
       <input type="text" name='name' value = {student.name}  placeholder='Name' onChange={changeHandling}/>
       <br />
        <input type="email" name='email' value = {student.email} placeholder='Email' onChange={changeHandling}/>
        <br />
        <input type="number" name='age' value = {student.age} placeholder='Age' onChange={changeHandling}/>
        <br />
        <button type='submit'>Update</button>
    </form>
    </>
  )
}

export default Update