import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function View() {
  const [student, setStudent] = useState({});
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(`http://localhost:3002/${id}`)
      .then((res) => {
        setStudent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      <div>
        <h1>View Student</h1>
        <div>
          <img src={`http://localhost:3002/uploads/${student.image}`} alt="" className="profile" />
          <h2>Name: {student.name} </h2>
          <h2>Age: {student.age}</h2>
        </div>
      </div>
    </>
  );
}

export default View;
