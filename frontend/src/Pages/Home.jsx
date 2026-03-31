import {useState, useEffect} from 'react'
import Axios from 'axios'
function Home() {
    const [students, setStudents] = useState([]);

    useEffect(() =>{
        Axios.get("http://localhost:3001/")
        .then((res)=>{
            setStudents(res.data);
        })
        .catch((err)=>{
            console.error("Error fetching students:", err);
        })
    }, [])
  return (
    <>
        <h1>Welcome to the Students Page</h1>
        {students.map((student)=>{
            return(
                <div key={student.id}>
                    <h2>{student.name}</h2>
                    <p>{student.email}</p>
                </div>
            )
        })}
    </>
  )
}

export default Home