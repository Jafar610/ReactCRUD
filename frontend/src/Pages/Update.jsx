import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/student/" + id)
      .then((res) => {
        setStudent(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    Axios.put("http://localhost:3001/update/" + id, student)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
  };

  return (
    <>
      <h1>Update Page</h1>
      <form onSubmit={handleUpdate}>
        <input name="name" value={student.name} onChange={handleChange} />
        <br />

        <input name="email" value={student.email} onChange={handleChange} />
        <br />

        <input name="age" value={student.age} onChange={handleChange} />
        <br />

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default Update;