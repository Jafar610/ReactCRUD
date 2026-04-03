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

  const onchangeHandling = (e) =>{
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }

  const[image, setImage] = useState(null);

  const formData = new FormData();

  formData.append("name", student.name);
  formData.append("email", student.email);
  formData.append("age", student.age);
  formData.append("image", image);

  const submitHandling = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3002/add", formData)
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