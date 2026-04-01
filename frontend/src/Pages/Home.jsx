import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Home() {
  const baseURL = "http://localhost:3001/";
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(baseURL).then((res)=>{
      setStudents(res.data);
    })
  }, []);

  const deleteHandling = (id) =>{
    axios.delete(`${baseURL}delete/${id}`)
    .then((res)=>{
      console.log(res);
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
        <h1>Student Management System</h1>
        <table border={1} cellSpacing={0}>
            <thead>
               <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
               </tr>
            </thead>
            <tbody>
             {
                students.map((student, index)=>(
                  <tr key = {student.id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <button>Edit</button>
                      <button onClick={()=>deleteHandling(student.id)}>Delete</button>
                    </td>
                  </tr>
                ))
             }
            </tbody>
        </table>
        <br />
        <div>
          <button onClick={()=>navigate('/add')}>Add Student</button>
        </div>
    </>
  )
}

export default Home