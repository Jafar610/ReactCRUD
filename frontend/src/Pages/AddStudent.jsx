import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: ''
  })

  const[image, setImage] = useState(null);

  const onchangeHandling = (e)=>{
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const submitHandling = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3002/add", student)
    .then((res)=>{
      console.log(res.data);
      navigate('/');
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  return (
    <>
      <h1>Add Students</h1>
      <form onSubmit={submitHandling}>
        <input type="text" name='name' placeholder='Name' onChange={onchangeHandling} />
        <br />
        <input type="email" name='email' placeholder='Email' onChange={onchangeHandling} />
        <br />
        <input type="number" name='age' placeholder='Age' onChange={onchangeHandling} />
        <br />
        <input type="file" name="image" id=""  onChange={(e)=>setImage(e.target.files[0])} />

        <button type='submit'>Add Student</button>
      </form>
    </>
  )
}

export default AddStudent