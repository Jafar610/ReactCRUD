import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Form() {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: " "
    });
    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/add", student)
        .then((res)=>{
            console.log(res);
            // navigate("/");
        })
        .catch((err)=>{
            console.error("Error fetching students:", err);
        })
    }


  return (
    <>
         <form>
      <input name="name" placeholder="Name"  onChange={handleChange} /> <br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />

      <input name="age" placeholder="Age" onChange={handleChange} /><br />

      <button type="submit" onClick={handleSubmit}>
        Add
      </button>
    </form>
    </>
  )
}

export default Form