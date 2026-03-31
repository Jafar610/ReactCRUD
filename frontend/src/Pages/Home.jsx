import {useState, useEffect} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Home() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        Axios.get("http://localhost:3001/")
        .then((res)=>{
            setStudents(res.data);
        })
        .catch((err)=>{
            console.error("Error fetching students:", err);
        })
    }, [])
    
    const deleteHandling = (id) => {
        // Implement delete functionality here
        Axios.delete("http://localhost:3001/delete/" + id)
        .then((res)=>{
            console.log(res);
            // Refresh the student list after deletion
            window.location.reload();
        })
        .catch((err)=>{
            console.error("Error fetching students:", err);
        })
    }


    const editHandling = (id) =>{
        // Implement edit functionality here
        Axios.put("http://localhost:3001/update/" + id)
        .then((res)=>{
            console.log(res);
        })
    }
    
  return (
    <>
        <h1>Welcome to the Students Page</h1>
        <table border={1} cellSpacing={0}>
            <thead>
                <tr>
                    <th>NO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index)=>(
                    <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>
                            <button onClick={()=> navigate("/Update/" + student.id)}>Update</button>
                            <button onClick={() => deleteHandling(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </>
  )
}

export default Home